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
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import AppModal from "./AppModal";
import CustomButton from "./CustomButton";

function ApplicationModalContent({ data, isPressed }) {
  const [joiningDate, setJoiningDate] = useState();
  const [availabilityDate, setAvailabilityDate] = useState();
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [view, setView] = useState(isPressed);

  const applicationData = {};

  const getData = (val) => {
    setView(false);
  };

  return (
    <AppModal
      numOfButton={1}
      heading="Send Application"
      isPressed={view}
      sendData={getData}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
        }}
        style={styles.container}
      >
        <AppText>Applying for</AppText>
        <AppText style={styles.boldText}>{data.job_title}</AppText>
        <AppText style={styles.text}>Organization</AppText>
        <AppText style={styles.boldText}>{data.company.name}</AppText>
        <AppText style={styles.text}>When you are ready to join:</AppText>

        <DatePicker
          titleStyle={joiningDate ? styles.dateTimeText : ""}
          // minDate={null}
          onDateChange={(date, timestamp) => {
            setJoiningDate(timestamp);
          }}
        />

        <AppText style={styles.text}>Availability</AppText>
        <AppText style={{ color: "#A3A3A3", fontSize: 12.5 }}>
          Specify date and time when you are available to take the call
        </AppText>
        <DatePicker
          titleStyle={availabilityDate ? styles.dateTimeText : ""}
          onDateChange={(date, timestamp) => {
            setAvailabilityDate(timestamp);
          }}
        />
        <View style={{ flexDirection: "row", marginBottom: 30 }}>
          <View style={{ width: "48%", marginRight: 7, marginLeft: 3 }}>
            <AppText style={styles.text}>From</AppText>
            <TimePicker
              // titleStyle={fromTime ? styles.dateTimeText : ""}
              onTimeChange={(time) => {
                setFromTime(time);
              }}
            />
          </View>
          <View style={{ width: "48%" }}>
            <AppText style={styles.text}>To</AppText>
            <TimePicker
              // titleStyle={toTime ? styles.dateTimeText : ""}
              onTimeChange={(time) => {
                setToTime(time);
              }}
            />
          </View>
        </View>
        <CustomButton
          title="Apply"
          // style={{ width: `${100 / props.numOfButton}%` }}
          onPress={() => {
            props.onApplyPress();
            // top.value = withSpring(dimensions.height, SPRING_CONFIG);
            setIsPressed();
            Toast.show({
              type: "appError",
              text1: "xyz xyz xyz msgs",
            });
          }}
        />
      </ScrollView>
    </AppModal>
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
    width: "110%",
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
