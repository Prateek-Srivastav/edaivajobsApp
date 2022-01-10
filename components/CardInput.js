import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

import AppText from "./AppText";

function CardInput(props) {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      {props.label && (
        <AppText
          style={{
            alignSelf: "flex-start",
            marginBottom: 5,
            ...props.labelStyle,
          }}
        >
          {props.label}
        </AppText>
      )}
      <View style={{ ...props.style, ...styles.container }}>
        <TextInput
          {...props}
          style={{
            flex: 1,
            marginHorizontal: 5,
            color: Colors.black,
            textAlignVertical: props.multiline ? "top" : null,
            marginTop: props.multiline ? 6 : 0,
          }}
        />
      </View>
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
    // marginHorizontal: 10,
    borderRadius: 3,
    // width: "100%",
    marginBottom: 10,
  },
});

export default CardInput;
