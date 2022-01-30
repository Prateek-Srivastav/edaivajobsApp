import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "./AppPicker";
import Colors from "../constants/Colors";

function TimePicker({ onTimeChange }) {
  const [show, setShow] = useState(false);
  const [initialTime, setInitialTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState();

  const onChange = (event, time) => {
    let hrs = time.getHours();
    let mins = time.getMinutes();

    let ampm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;

    if (hrs <= 9) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;

    setSelectedTime(hrs + ":" + mins + ` ${ampm}`);
    setInitialTime(time);
    setShow(false);
  };

  return (
    <>
      <AppPicker
        titleStyle={selectedTime ? styles.dateTimeText : ""}
        onPress={() => {
          setShow(true);
        }}
        icon={<MaterialIcons name="access-time" size={17} color="#817E7E" />}
        style={{ marginHorizontal: 0 }}
        title={selectedTime ? selectedTime : "--:-- --"}
      />
      {show && (
        <DateTimePicker
          testID="timePicker"
          minimumDate={new Date()}
          value={initialTime}
          mode="time"
          display="default"
          onChange={(event, time) => {
            onChange(event, time);
            onTimeChange(time);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dateTimeText: {
    color: Colors.primary,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
  },
});

export default TimePicker;
