import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

import AppText from "./AppText";
import AppPicker from "./AppPicker";

function ApplicationModalContent({ data }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedJoiningDate, setSelectedJoiningDate] = useState();
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] = useState();
  const [selectedFromTime, setSelectedFromTime] = useState();
  const [selectedToTime, setSelectedToTime] = useState();
  const [origin, setOrigin] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (origin === "joiningDate") {
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;

      if (date <= 9) date = "0" + date;
      if (month < 10) month = "0" + month;

      setSelectedJoiningDate(
        date + "/" + month + "/" + currentDate.getFullYear()
      );
    } else if (origin === "availabilityDate") {
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;

      if (date <= 9) date = "0" + date;
      if (month < 10) month = "0" + month;

      setSelectedAvailabilityDate(
        date + "/" + month + "/" + currentDate.getFullYear()
      );
    } else if (origin === "fromTime") {
      let hrs = currentDate.getHours();
      let mins = currentDate.getMinutes();

      let ampm = hrs >= 12 ? "PM" : "AM";
      hrs = hrs % 12;
      hrs = hrs ? hrs : 12;

      if (hrs <= 9) hrs = "0" + hrs;
      if (mins < 10) mins = "0" + mins;

      setSelectedFromTime(hrs + ":" + mins + ` ${ampm}`);
    } else if (origin === "toTime") {
      let hrs = currentDate.getHours();
      let mins = currentDate.getMinutes();

      let ampm = hrs >= 12 ? "PM" : "AM";
      hrs = hrs % 12;
      hrs = hrs ? hrs : 12;

      if (hrs <= 9) hrs = "0" + hrs;
      if (mins < 10) mins = "0" + mins;

      setSelectedToTime(hrs + ":" + mins + ` ${ampm}`);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AppText>Applying for</AppText>
      <AppText style={styles.boldText}>{data.heading}</AppText>
      <AppText style={styles.text}>Organization</AppText>
      <AppText style={styles.boldText}>{data.companyName}</AppText>
      <AppText style={styles.text}>When you are ready to join:</AppText>
      {/* <View> */}
      {/* <View style={{ marginRight: 20, width: "100%" }}> */}
      <AppPicker
        titleStyle={selectedJoiningDate ? styles.dateTimeText : ""}
        onPress={() => {
          setOrigin("joiningDate");
          showDatepicker();
        }}
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
        style={{ marginHorizontal: 3, width: "97%" }}
        title={selectedJoiningDate ? selectedJoiningDate : "Date"}
      />
      {/* </View> */}
      <AppText style={styles.text}>Availability</AppText>
      <AppText style={{ color: "#A3A3A3", fontSize: 12.5 }}>
        Specify date and time when you are available to take the call
      </AppText>
      <AppPicker
        titleStyle={selectedAvailabilityDate ? styles.dateTimeText : ""}
        onPress={() => {
          setOrigin("availabilityDate");
          showDatepicker();
        }}
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
        style={{ marginHorizontal: 3, width: "97%" }}
        title={selectedAvailabilityDate ? selectedAvailabilityDate : "Date"}
      />
      <View style={{ flexDirection: "row", marginBottom: 30 }}>
        <View style={{ width: "48%", marginRight: 7, marginLeft: 3 }}>
          <AppText style={styles.text}>From</AppText>
          <AppPicker
            titleStyle={selectedFromTime ? styles.dateTimeText : ""}
            onPress={() => {
              setOrigin("fromTime");
              showTimepicker();
            }}
            icon={
              <MaterialIcons name="access-time" size={17} color="#817E7E" />
            }
            style={{ marginHorizontal: 0 }}
            title={selectedFromTime ? selectedFromTime : "--:-- --"}
          />
        </View>
        <View style={{ width: "48%" }}>
          <AppText style={styles.text}>To</AppText>
          <AppPicker
            titleStyle={selectedToTime ? styles.dateTimeText : ""}
            onPress={() => {
              setOrigin("toTime");
              showTimepicker();
            }}
            icon={
              <MaterialIcons name="access-time" size={17} color="#817E7E" />
            }
            style={{ marginHorizontal: 0 }}
            title={selectedToTime ? selectedToTime : "--:-- --"}
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          minimumDate={new Date()}
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boldText: {
    color: Colors.primary,
    fontSize: 17.5,
    fontFamily: "OpenSans-SemiBold",
    marginLeft: 5,
    // marginBottom: 10,
  },
  container: {
    // flex: 1,
    width: "110%",
    padding: 20,
    paddingBottom: 90,
    marginBottom: 30,
  },
  dateTimeText: {
    color: Colors.primary,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
  },
  text: {
    marginTop: 25,
  },
});

export default ApplicationModalContent;
