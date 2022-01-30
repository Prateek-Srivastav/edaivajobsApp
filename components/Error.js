import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import CustomButton from "./CustomButton";

function Error({ onPress }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppText>Couldn't load jobs</AppText>
      <CustomButton
        title="Retry"
        onPress={onPress}
        style={{ height: 60, flex: 0.1, width: 200 }}
      />
    </View>
  );
}

export default Error;
