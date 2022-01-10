import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";

function AddProjectsScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <CardInput label="Title" placeholder="xyz" />
      <CardInput label="Role" placeholder="xyz" />
      <AppPicker label="Team Size" title="xyz" />
      <AppPicker label="Duration" title="xyz" />
      <CardInput
        label="Description"
        numberOfLines={6}
        multiline
        placeholder="Describe your project here..."
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

export default AddProjectsScreen;
