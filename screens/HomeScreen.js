import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";
// import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import Colors from "../constants/Colors";
import dummyData from "../dummyData.js/data";
import JobCard from "../components/JobCard";
import Modal from "../components/Modal";

const { width, height } = Dimensions.get("screen");

function HomeScreen(props) {
  const [isPressed, setIsPressed] = useState(false);

  const getData = (val) => {
    setIsPressed(false);
  };

  return (
    <View style={{ flex: 1, width, height }}>
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
          <TouchableOpacity style={styles.dpContainer}>
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
            25 Jobs found
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
            contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
            data={dummyData}
            renderItem={(itemData) => (
              <JobCard
                heading={itemData.item.heading}
                companyName={itemData.item.companyName}
                jobType={itemData.item.jobType}
                location={itemData.item.location}
                description={itemData.item.description}
                postedDate={itemData.item.postedDate}
                applied={itemData.item.applied}
              />
            )}
          />
        </View>
      </View>
      <Modal isPressed={isPressed} sendData={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    paddingTop: 20,
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
