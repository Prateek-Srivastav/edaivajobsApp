import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

import AppModal from "../components/AppModal";
import ApplicationModalContent from "../components/ApplicationModalContent";
import { BuildingIcon, Location } from "../assets/svg/icons";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import jobsApi from "../api/jobs";
import useApi from "../hooks/useApi";

const { width, height } = Dimensions.get("screen");

function JobDetailScreen({ route }) {
  const [showDetail, setShowDetail] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [position] = useState(new Animated.ValueXY());

  const jobId = route.params.jobId;

  const {
    data: jobDetails,
    error,
    networkError,
    loading,
    request: loadJobDetails,
  } = useApi(jobsApi.getJobDetails);

  useEffect(() => {
    loadJobDetails(jobId);
  }, []);

  // const { width } = Dimensions.get("screen");

  const getData = (val) => {
    setIsPressed(false);
  };

  const animStyles = {
    top: 0,
    borderRadius: 20,
    height: 3,
    width: width / 6,
    backgroundColor: Colors.primary,
    transform: position.getTranslateTransform(),
  };

  const Description = ({ show }) => {
    const animate = (value) => {
      Animated.timing(position, {
        toValue: { x: value, y: 0 },
        duration: 160,
        useNativeDriver: true,
      }).start();
    };

    let detail;
    if (show === 1) {
      detail = jobDetails.job_description;
      animate(width / 20);
    } else if (show === 2) {
      detail = jobDetails.responsibility;
      animate(width / 2.4);
    } else if (show === 3) {
      detail = jobDetails.more;
      animate(width / 1.44);
    }

    return (
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          width: "100%",
          marginTop: 10,
          // marginBottom: 10,
        }}
      >
        <AppText
          style={{
            color: Colors.black,
            textAlign: "justify",
          }}
        >
          {detail}
        </AppText>
      </ScrollView>
    );
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : (
    <View style={{ flex: 1, width: width, height: height }}>
      <View style={styles.container}>
        <View
          style={{
            // flex: 1,
            // borderWidth: 1,
            width: "100%",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={styles.card}>
            <Text style={styles.heading}>{jobDetails.heading}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <BuildingIcon color="#BDEEFF" />
              <Text style={styles.text}>{jobDetails.companyName}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Location color="#BDEEFF" />
              <Text style={styles.text}>{jobDetails.location}</Text>
            </View>
            <Card
              style={{
                marginTop: 20,
                paddingHorizontal: 13,
                paddingRight: 3,
                // marginLeft: 0,
                alignSelf: "center",
              }}
            >
              <View style={styles.cardBlue}>
                <AppText style={{ color: Colors.primary }}>
                  {jobDetails.jobType}
                </AppText>
              </View>

              {!jobDetails.isApplied && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 3,
                    marginRight: 7,
                  }}
                >
                  <AppText
                    style={{ fontSize: 12, fontFamily: "OpenSans-Medium" }}
                  >
                    Apply by
                  </AppText>
                  <AppText
                    style={{
                      fontSize: 12,
                      fontFamily: "OpenSans-Medium",
                      color: Colors.primary,
                    }}
                  >
                    {jobDetails.lastApplicationDate}
                  </AppText>
                </View>
              )}
            </Card>
            <Card
              style={{
                flexDirection: "column",
                alignSelf: "center",
                width: "100%",
                // alignItems: "space-evenly",
                paddingHorizontal: 30,
                paddingVertical: 17,
                // backgroundColor: "blue",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View>
                  <AppText style={{ marginBottom: 6 }}>Degree</AppText>
                  <AppText style={styles.requirementText}>Graduate</AppText>
                  <AppText style={styles.requirementText}>
                    Post graduate
                  </AppText>
                </View>
                <View>
                  <AppText style={{ marginBottom: 6 }}>Work Experience</AppText>
                  <AppText style={styles.requirementText}>0-2 Years</AppText>
                </View>
              </View>
              <View>
                <AppText style={{ marginBottom: 6 }}>Required skills</AppText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText style={styles.requirementText}>Python </AppText>
                  <AppText style={styles.requirementText}>Angular </AppText>
                  <AppText style={styles.requirementText}>Javascript</AppText>
                </View>
              </View>
            </Card>
          </Card>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setShowDetail(1)}>
            <AppText style={styles.detailsHeading}>DESCRIPTION</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDetail(2)}>
            <AppText style={styles.detailsHeading}>RESPONSIBILITY</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDetail(3)}>
            <AppText style={styles.detailsHeading}>MORE</AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // borderWidth: 1,
            width: "85%",
            // marginHorizontal: 20,
            marginTop: 3,
          }}
        >
          <Animated.View style={animStyles} />
        </View>
        <Description show={showDetail} />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginVertical: -10,
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              elevation: 3,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              backgroundColor: "white",
              padding: 4,
              marginRight: 10,
            }}
          >
            <MaterialCommunityIcons
              name="bookmark-minus-outline"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <CustomButton
            disabled={jobDetails.isApplied}
            onPress={() => {
              setIsPressed(true);
            }}
            title={jobDetails.isApplied ? "Applied" : "Apply"}
            // style={{ width: "72%" }}
          />
        </View>
      </View>

      <AppModal
        numOfButton={1}
        heading="Send Application"
        isPressed={isPressed}
        sendData={getData}
      >
        <ApplicationModalContent data={jobDetails} />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    top: -5,
    flexDirection: "column",
    // flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  cardBlue: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 3,
    backgroundColor: Colors.cardBlue,
    paddingVertical: 3,
    marginRight: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bg,
    // width: "100%",
  },
  detailsHeading: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
    color: Colors.primary,
  },
  heading: {
    fontFamily: "OpenSans-Bold",
    fontSize: 25,
    color: Colors.primary,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  requirementText: {
    fontFamily: "OpenSans-Medium",
    color: Colors.black,
    fontSize: 15,
    marginStart: 5,
  },
  text: {
    fontFamily: "OpenSans-Medium",
    color: Colors.primary,
    fontSize: 15.5,
    marginStart: 3,
  },
});

export default JobDetailScreen;
