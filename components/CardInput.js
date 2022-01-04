import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

function CardInput(props) {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <TextInput {...props} style={{ flex: 1, marginLeft: 5 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#FFFFFF",
    elevation: 3,
    marginHorizontal: 10,
    borderRadius: 3,
    // marginBottom: 20,
  },
});

export default CardInput;
