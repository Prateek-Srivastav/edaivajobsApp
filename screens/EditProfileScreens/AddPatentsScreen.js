import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";
function AddPatentsScreen(props) {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 15 }}
      style={styles.container}
    >
      <CardInput label="Patent Title" placeholder="xyz" />
      <CardInput label="Patent Office" placeholder="xyz" />
      <CardInput label="Patent No. / Application No." placeholder="xyz" />
      <AppPicker label="Patent Status" title="Select" />
      <AppPicker
        label="Issue Date"
        title="Select Date"
        icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
      />
      <CardInput label="Patent URL" placeholder="Paste URL here" />
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

export default AddPatentsScreen;
