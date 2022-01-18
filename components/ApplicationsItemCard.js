import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../components/AppText";
import Colors from "../constants/Colors";
import dummyData from "../dummyData.js/data";
import { BuildingIcon, Location } from "../assets/svg/icons";

const ApplicationStatus = ({ applicationStatus }) => {
  let bgColor;
  let primaryColor;
  let text;

  if (applicationStatus === "applied") {
    bgColor = "#CBF1FF4D";
    primaryColor = Colors.primary;
    text = "Applied";
  } else if (applicationStatus === "underReview") {
    bgColor = "#FDFF9870";
    primaryColor = "#AEB11C";
    text = "Under Review";
  } else if (applicationStatus === "hired") {
    bgColor = "#BEFFA74D";
    primaryColor = "#2D811F";
    text = "Hired";
  } else if (applicationStatus === "interviewing") {
    bgColor = "rgba(233, 126, 0, 0.15)";
    primaryColor = "#E97E00";
    text = "Interviewing";
  } else if (applicationStatus === "rejected") {
    bgColor = "rgba(241, 18, 18, 0.15)";
    primaryColor = "#F11212";
    text = "Rejected";
  }

  return (
    <View
      style={{
        ...styles.lightBackground,
        backgroundColor: bgColor,
        borderColor: primaryColor,
      }}
    >
      <Text style={{ ...styles.applicationStatus, color: primaryColor }}>
        {text}
      </Text>
    </View>
  );
};

const renderRightActions = () => (
  <TouchableOpacity activeOpacity={0.7} style={styles.rightActionContainer}>
    <Entypo name="squared-minus" size={24} color={Colors.bg} />
    <Text style={styles.rightActionText}>Revoke Application</Text>
  </TouchableOpacity>
);

const ApplicationItemCard = (props) => (
  <View
    style={{
      backgroundColor: Colors.primary,
      elevation: 5,
      marginVertical: 8,
      borderRadius: 5,
      overflow: "hidden",
    }}
  >
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.9}
        style={{ ...styles.container, ...props.style }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.heading}>{props.heading}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 7,
          }}
        >
          <BuildingIcon />
          <Text style={styles.text}>{props.companyName}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Location />
          <Text style={styles.text}>{props.location}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <AppText style={{ color: "#ccc", fontSize: 12 }}>
              Applied on:{" "}
            </AppText>
            <AppText style={{ color: "#ccc", fontSize: 12 }}>
              Jan 14, 2021
            </AppText>
          </View>
          <ApplicationStatus applicationStatus={props.applicationStatus} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  </View>
);

const styles = StyleSheet.create({
  applicationStatus: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13,
  },
  container: {
    padding: 15,
    width: "97%",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    elevation: 50,
  },
  heading: {
    fontFamily: "OpenSans-Regular",
    fontSize: 17,
  },
  lightBackground: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 7,
    borderRadius: 3,
    borderWidth: 0.8,
  },
  rightActionContainer: {
    backgroundColor: Colors.primary,
    width: 70,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  rightActionText: {
    color: Colors.bg,
    textAlign: "center",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
  },
  text: {
    fontFamily: "OpenSans-Regular",
    color: "#202020",
    fontSize: 13,
    marginStart: 3,
  },
});

export default ApplicationItemCard;