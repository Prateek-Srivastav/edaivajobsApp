import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import AppText from "../../components/AppText";
import CardInput from "../../components/CardInput";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";

function AddAcademicsScreen(props) {
  return (
    <View style={styles.container}>
      <CardInput label="Institute/College/University" placeholder="xyz" />
      <AppPicker label="Degree" title="Select" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CardInput
          label="Specialization"
          placeholder="If any"
          style={{ width: "49%", marginRight: 5 }}
        />
        <CardInput
          label="Grade"
          placeholder="Percentage/CGPA"
          style={{ width: "49%" }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppPicker
          label="From"
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          title={selectedBirthDate ? selectedBirthDate : "Date"}
          // onPress={() => {
          //   setOrigin("birthDate");
          //   showDatepicker();
          // }}
          style={{ width: "49%", marginRight: 5 }}
        />
        <AppPicker
          label="To"
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          title={selectedBirthDate ? selectedBirthDate : "Date"}
          // onPress={() => {
          //   setOrigin("birthDate");
          //   showDatepicker();
          // }}
          style={{ width: "49%" }}
        />
      </View>
      <TouchableOpacity activeOpacity={0.4} style={styles.box}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 3,
            borderColor: Colors.primary,
            height: 15,
            width: 15,
            marginRight: 5,
          }}
        />
        <AppText>Present</AppText>
      </TouchableOpacity>

      <CustomButton
        title="Add"

        // onPress={() => {
        //   top.value = withSpring(dimensions.height, SPRING_CONFIG);
        //   setIsPressed(false);
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    padding: 15,
  },
});

export default AddAcademicsScreen;
