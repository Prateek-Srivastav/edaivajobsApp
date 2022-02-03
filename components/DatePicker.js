import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "./AppPicker";
import Colors from "../constants/Colors";
import { setLocale } from "yup";

function DatePicker({
  disabled,
  onDateChange,
  minDate,
  label,
  value,
  style,
  initialDate,
}) {
  const [show, setShow] = useState(false);
  const [initDate, setInitDate] = useState(
    initialDate ? new Date(initialDate) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState("Date");

  const onChange = (event, date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;

    if (day <= 9) day = "0" + day;
    if (month < 10) month = "0" + month;

    setShow(false);
    setSelectedDate(day + "/" + month + "/" + date.getFullYear());
    setInitDate(date);
    onDateChange(day + "/" + month + "/" + date.getFullYear(), date);
  };

  return (
    <>
      <AppPicker
        disabled={disabled}
        style={style}
        label={label}
        dateTimePicker
        // titleStyle={selectedDate ? styles.dateTimeText : ""}
        onPress={() => {
          if (!disabled) setShow(true);
        }}
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
        title={value ? value : selectedDate}
      />
      {show && (
        <DateTimePicker
          testID="timePicker"
          minimumDate={minDate !== undefined ? minDate : new Date()}
          value={initDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            onChange(event, date);
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
