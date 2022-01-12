import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";

function PersonalDetailsScreen(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState();
  const [origin, setOrigin] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <AppPicker
        label="DATE OF BIRTH"
        title={selectedBirthDate ? selectedBirthDate : "Date"}
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
        onPress={() => {
          setOrigin("birthDate");
          showDatepicker();
        }}
      />
      <CardInput label="PHONE" />
      <CardInput label="ADDRESS" placeholder="Apartment, Landmark" />
      <CardInput placeholder="Street" />
      <CardInput placeholder="City" />
      <AppPicker title="State" />
      <AppPicker title="Country" />
      <CustomButton
        title="Save"

        // onPress={() => {
        //   top.value = withSpring(dimensions.height, SPRING_CONFIG);
        //   setIsPressed(false);
        // }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 15,
    // alignItems: "center",
  },
});

export default PersonalDetailsScreen;
