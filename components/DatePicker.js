import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "./AppPicker";
import Colors from "../constants/Colors";

function DatePicker({ onDateChange, minDate }) {
  const [show, setShow] = useState(false);
  const [initialDate, setInitialDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();

  const onChange = (event, date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day <= 9) day = "0" + day;
    if (month < 10) month = "0" + month;

    setSelectedDate(day + "/" + month + "/" + date.getFullYear());
    setInitialDate(date);
    setShow(false);
  };

  return (
    <>
      <AppPicker
        titleStyle={selectedDate ? styles.dateTimeText : ""}
        onPress={() => {
          setShow(true);
        }}
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
        title={selectedDate ? selectedDate : "Date"}
      />
      {show && (
        <DateTimePicker
          testID="timePicker"
          minimumDate={minDate !== undefined ? minDate : new Date()}
          value={initialDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            onChange(event, date);
            onDateChange(date);
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

export default DatePicker;
