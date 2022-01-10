import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";

function AddAchievementsScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <CardInput label="Title" placeholder="xyz" />
      <AppPicker
        label="Date"
        title="Date of achievement"
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
      />
      <CardInput
        label="Description"
        numberOfLines={6}
        multiline
        placeholder="Describe your achievement."
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

export default AddAchievementsScreen;
