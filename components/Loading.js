import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
