import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

import AppModal from "../components/AppModal";
import Colors from "../constants/Colors";
import FilterModalContent from "../components/FilterModalContent";
import jobsApi from "../api/jobs";
import JobCard from "../components/JobCard";
import AppText from "../components/AppText";
import CustomButton from "../components/CustomButton";
import useApi from "../hooks/useApi";

const { width, height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
  const [isPressed, setIsPressed] = useState(false);
  // const [jobs, setJobs] = useState();

  const {
    data,
    error,
    networkError,
    loading,
    request: loadJobs,
  } = useApi(jobsApi.getJobs);

  let jobs;

  if (data) {
    jobs = data.docs;
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const getData = (val) => {
    setIsPressed(false);
  };

  if (networkError && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText>Connection Lost</AppText>
        <CustomButton
          title="Refresh"
          onPress={loadJobs}
          style={{ height: 60, flex: 0.1, width: 200 }}
        />
      </View>
    );
  }

  if (error) {
    return (
      <>
        <AppText>Couldn't load jobs</AppText>
        <CustomButton title="Retry" onPress={loadJobs} />
      </>
    );
  }

  return (
    <View style={{ flex: 1, width }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 15,
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            style={styles.dpContainer}
            onPress={navigation.openDrawer}
          >
            <Image
              source={require("../assets/dummyDP.png")}
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Feather name="search" size={24} color={Colors.primary} />
            <TextInput style={{ flex: 1, marginLeft: 5 }} />
          </View>
          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => {
              setIsPressed(true);
            }}
          >
            <Feather name="filter" size={23} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.reminderContainer}>
              <Image
                source={require("../assets/bell.png")}
                resizeMode="contain"
                style={{ height: 30, width: 30 }}
              />
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "OpenSans-SemiBold",
                    color: Colors.primary,
                  }}
                >
                  Interview Reminder
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "OpenSans-Regular",
                    color: "#6C6C6C",
                  }}
                >
                  You have an interview schedule today at 2 pm
                </Text>
              </View>
              <AntDesign name="rightsquare" size={35} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.filterContainer}>
              <Text style={styles.greyText}>Filter</Text>
              <View style={styles.line} />
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={[
                  "Delhi",
                  "Internship",
                  "0-2 years",
                  "Python",
                  "Full-time",
                  "Full-stack",
                ]}
                renderItem={(itemData) => (
                  <TouchableOpacity style={styles.filterTextContainer}>
                    <Text style={{ ...styles.greyText, color: Colors.primary }}>
                      {itemData.item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 15,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  ...styles.greyText,
                  fontFamily: "OpenSans-Medium",
                  color: Colors.black,
                  marginStart: 2,
                }}
              >
                {jobs ? jobs.length : ""} Jobs found
              </Text>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    ...styles.greyText,
                    color: Colors.primary,
                    marginStart: 20,
                  }}
                >
                  Popularity
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
              }}
            >
              <FlatList
                keyExtractor={(item, index) => item._id}
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  paddingBottom: 20,
                }}
                data={jobs}
                renderItem={(itemData) => {
                  const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec",
                  ];
                  const { city, state, country } =
                    itemData.item.job_location[0];
                  let postedDate = new Date(itemData.item.created_on);

                  const location = `${city}, ${state}, ${country}`;

                  const date = postedDate.getDate();
                  const month = monthNames[postedDate.getMonth()];

                  postedDate =
                    month + " " + date + ", " + postedDate.getFullYear();

                  return (
                    <JobCard
                      onPress={() =>
                        navigation.navigate("JobDetail", {
                          jobId: itemData.item._id,
                        })
                      }
                      heading={itemData.item.job_title}
                      companyName={itemData.item.company.name}
                      jobType={itemData.item.job_type.name}
                      location={location}
                      description={itemData.item.job_description}
                      postedDate={postedDate}
                      isApplied={itemData.item.applied}
                    />
                  );
                }}
              />
            </View>
          </>
        )}
      </View>
      <AppModal
        numOfButton={2}
        heading="Filter"
        isReset
        isPressed={isPressed}
        sendData={getData}
      >
        <FilterModalContent />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    paddingTop: StatusBar.currentHeight,
  },
  dpContainer: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderRadius: 3,
  },
  filterContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#0AB4F14D",
    borderRadius: 3,
    paddingStart: 8,
    marginHorizontal: 15,
  },
  filterIconContainer: {
    padding: 7,
    backgroundColor: "#FFFFFF",
    elevation: 3,
    borderRadius: 3,
  },
  filterTextContainer: {
    flexDirection: "row",
    borderRadius: 3,
    backgroundColor: "#B9ECFF4D",
    borderColor: "#0AB4F14D",
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  greyText: {
    fontSize: 13,
    fontFamily: "OpenSans-Regular",
    color: "#6C6C6C",
  },
  header: {
    backgroundColor: Colors.primary,
    elevation: 5,
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#FFFFFF",
    elevation: 3,
    marginHorizontal: 10,
    borderRadius: 3,
  },
  line: {
    height: 27,
    width: 1.2,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#D4D4D4",
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#00000040",
  },
  panelHeader: { alignItems: "center" },
  reminderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E7F9FF",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 3,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default HomeScreen;
