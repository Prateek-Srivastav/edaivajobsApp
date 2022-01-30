import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";
import DatePicker from "../../components/DatePicker";

function PersonalDetailsScreen(props) {
  const [dob, setDob] = useState();

  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <CardInput label="EMAIL" />
      <DatePicker
        minDate={null}
        onDateChange={(date) => {
          setDob(date);
          console.log(dob, "dob");
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
