import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import AppPicker from "../../components/AppPicker";
import AppText from "../../components/AppText";
import CardInput from "../../components/CardInput";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";

function AddExperienceScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <CardInput label="Company" placeholder="xyz" />
      <CardInput label="Job Type" placeholder="xyz" />
      <CardInput label="Role" placeholder="xyz" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppPicker
          label="From"
          title="xyz"
          iconName="date-range"
          onPress={() => {
            setOrigin("birthDate");
            showDatepicker();
          }}
          style={{ width: "49%", marginRight: 5 }}
        />
        <AppPicker
          label="To"
          title="xyz"
          iconName="date-range"
          onPress={() => {
            setOrigin("birthDate");
            showDatepicker();
          }}
          style={{ width: "49%" }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.4}
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
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
      <CardInput
        label="Responsibility"
        // style={{ marginTop: 10 }}
        numberOfLines={6}
        multiline
        placeholder="xyz"
      />
      <CustomButton
        title="Add"

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
    paddingTop: 70,
  },
});

export default AddExperienceScreen;
