import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

function CustomButton(props) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{
        ...styles.button,
        ...props.style,
      }}
    >
      <Text style={{ ...styles.titleStyle, ...props.titleStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: Colors.primary,
  },
  titleStyle: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

export default CustomButton;
