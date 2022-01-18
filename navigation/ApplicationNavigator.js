import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import ApplicationsScreen from "../screens/ApplicationsScreen";
import ApplicationStatusScreen from "../screens/ApplicationStatusScreen";
import Colors from "../constants/Colors";

const Stack = createNativeStackNavigator();

const ApplicationStatus = ({ applicationStatus }) => {
  let bgColor;
  let primaryColor;
  let text;

  if (applicationStatus === "interviewing") {
    bgColor = "rgba(233, 126, 0, 0.15)";
    primaryColor = "#E97E00";
    text = "Interviewing";
  } else if (
    applicationStatus === "shortlisted" ||
    applicationStatus === "underReview" ||
    applicationStatus === "applied"
  ) {
    bgColor = "#FDFF9870";
    primaryColor = "#AEB11c";
    text = "Short Listed";
  } else if (applicationStatus === "hired") {
    bgColor = "#BEFFA74D";
    primaryColor = "#2D811F";
    text = "Hired";
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
      {applicationStatus === "rejected" ? (
        <Entypo name="cross" size={22} color={primaryColor} />
      ) : (
        <MaterialCommunityIcons
          name="lightning-bolt"
          size={18}
          color={primaryColor}
        />
      )}

      <Text style={{ ...styles.text, color: primaryColor }}>{text}</Text>
    </View>
  );
};

function ApplicationNavigator() {
  // console.log(route);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "OpenSans-SemiBold",
          color: Colors.primary,
          fontSize: 20,
        },
        headerTintColor: Colors.primary,
      }}
    >
      <Stack.Screen name="Applications" component={ApplicationsScreen} />
      <Stack.Screen
        name="ApplicationStatus"
        component={ApplicationStatusScreen}
        options={({ route }) => ({
          title: "",
          headerRight: () => {
            return (
              <ApplicationStatus
                applicationStatus={route.params.itemData.item.applicationStatus}
              />
            );
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  lightBackground: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: 80,
    padding: 5,
    paddingRight: 8,
    borderRadius: 3,
    borderWidth: 0.8,
  },

  text: {
    fontFamily: "OpenSans-Medium",
    color: "#202020",
    fontSize: 14.5,
  },
});

export default ApplicationNavigator;
