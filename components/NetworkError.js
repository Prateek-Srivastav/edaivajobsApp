import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import CustomButton from "./CustomButton";

function NetworkError({ onPress }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText>Connection Lost</AppText>
      <CustomButton
        title="Refresh"
        onPress={onPress}
        style={{ height: 60, flex: 0.1, width: 200 }}
      />
    </View>
  );
}

export default NetworkError;
