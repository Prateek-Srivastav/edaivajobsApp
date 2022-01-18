import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, Image, View, StyleSheet, Text } from "react-native";

import AppText from "../components/AppText";
import Colors from "../constants/Colors";

const dummyData = [
  {
    id: 1,
    heading: "Interview Reminder",
    details: "You have an interview schedule today at 2 pm",
    img: "bell",
  },
  {
    id: 2,
    heading: "Woah!. You have been shortlisted!!..",
    details: "You have been shortlisted for the Tele-calling in.......",
    img: "shortlisted",
  },
  {
    id: 3,
    heading: "Congratulations!!.. You did it.",
    details: "You are selected for the role of Telecalling in iraitech.",
    img: "selected",
  },
  {
    id: 4,
    heading: "Interview Reminder",
    details: "You have an interview schedule today at 2 pm",
    img: "bell",
  },
  {
    id: 5,
    heading: "Interview Reminder",
    details: "You have an interview schedule today at 2 pm",
    img: "bell",
  },
];

const NormalText = (props) => (
  <Text style={styles.normalText}>{props.children}</Text>
);

const NotificationItem = ({ heading, details, img }) => {
  let image;

  if (img === "selected") image = require("../assets/selected.png");
  else if (img === "shortlisted") image = require("../assets/shortlisted.png");
  else if (img === "bell") image = require("../assets/bell.png");

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.imgContainer}>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <NormalText>{heading}</NormalText>
        <AppText numberOfLines={1}>{details}</AppText>
      </View>
    </View>
  );
};

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ width: "100%" }}
        data={dummyData}
        renderItem={(itemData) => (
          <>
            <NotificationItem
              // onPress={() => navigation.navigate("JobDetail", { itemData })}
              heading={itemData.item.heading}
              details={itemData.item.details}
              img={itemData.item.img}
            />
            <View style={styles.line} />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  imgContainer: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 3,
  },
  largeText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 5,
  },
  line: {
    alignSelf: "center",
    width: "93%",
    height: 1.2,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#EFEFEF",
  },
  normalText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: Colors.primary,
  },
  notificationContainer: {
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
  },
});

export default NotificationsScreen;
