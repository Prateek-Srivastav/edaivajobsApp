import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";

function AddSocialLinksScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <AppPicker label="Choose social media" title="Select" />
      <CardInput label="Link" placeholder="Paste Link here..." />

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
  container: {},
});

export default AddSocialLinksScreen;
