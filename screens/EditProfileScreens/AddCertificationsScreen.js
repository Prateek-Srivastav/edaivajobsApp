import React from "react";
import { View, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import AppPicker from "../../components/AppPicker";
import CardInput from "../../components/CardInput";
import CustomButton from "../../components/CustomButton";

function AddCertificationsScreen(props) {
  return (
    <View style={styles.container}>
      <CardInput label="Title" placeholder="xyz" />
      <AppPicker label="Issued by" title="Select" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppPicker
          label="Issued Date"
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          style={{ width: "49%", marginRight: 5 }}
        />
        <AppPicker
          label="Valid Till"
          icon={<MaterialIcons name="date-range" size={17} color="#817E7E" />}
          style={{ width: "49%" }}
        />
      </View>
      <CardInput label="Certficate ID" placeholder="xyz" />
      <CardInput label="Certificate Link" placeholder="Paste link here" />

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
  container: {
    padding: 15,
  },
});

export default AddCertificationsScreen;
