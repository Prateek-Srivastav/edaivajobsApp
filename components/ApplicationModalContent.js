import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Platform } from "react-native";

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

    if (origin === "joiningDate")
      setSelectedJoiningDate(
        currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear()
      );
    else if (origin === "availabilityDate")
      setSelectedAvailabilityDate(
        currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear()
      );
    else if (origin === "fromTime")
      setSelectedFromTime(
        currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear()
      );
    else if (origin === "toTime")
      setSelectedToTime(
        currentDate.getDate() +
          "/" +
          (currentDate.getMonth() + 1) +
          "/" +
          currentDate.getFullYear()
      );
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
    <View style={styles.container}>
      <AppText style={styles.text}>Applying for</AppText>
      <AppText style={styles.boldText}>{data.heading}</AppText>
      <AppText style={styles.text}>Organization</AppText>
      <AppText style={styles.boldText}>{data.companyName}</AppText>
      <AppText style={styles.text}>When you are ready to join:</AppText>
      <View>
        <AppPicker
          titleStyle={selectedJoiningDate ? styles.dateTimeText : ""}
          onPress={() => {
            setOrigin("joiningDate");
            showDatepicker();
          }}
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          style={{ marginHorizontal: 0 }}
          title={selectedJoiningDate ? selectedJoiningDate : "Date"}
        />
        <AppText style={styles.text}>Availability</AppText>
        <AppText style={{ color: "#A3A3A3", fontSize: 13 }}>
          Specify date and time when you are available to take the call
        </AppText>
        <AppPicker
          titleStyle={selectedAvailabilityDate ? styles.dateTimeText : ""}
          onPress={() => {
            setOrigin("availabilityDate");
            showDatepicker();
          }}
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          style={{ marginHorizontal: 0 }}
          title={selectedAvailabilityDate ? selectedAvailabilityDate : "Date"}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "49%", marginRight: 7 }}>
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
              title="--:-- --"
            />
          </View>
          <View style={{ width: "49%" }}>
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
              title="--:-- --"
            />
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={() => onChange(origin)}
          />
        )}
      </View>
    </View>
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
    flex: 1,
    width: "100%",
  },
  dateTimeText: {
    color: Colors.primary,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
  },
  text: {
    marginTop: 20,
  },
});

export default ApplicationModalContent;
