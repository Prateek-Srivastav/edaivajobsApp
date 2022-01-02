import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function CustomButton(props) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.4}
      style={{
        ...styles.button,
        ...props.style,
        backgroundColor: "#21b4f0",
      }}
    >
      <Text
        style={{
          fontFamily: "OpenSans-SemiBold",
          fontSize: 16,
          color: "white",
          textAlign: "center",
        }}
      >
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
  },
});

export default CustomButton;
