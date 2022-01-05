import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function AppPicker(props) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{ ...styles.container, ...props.style }}
    >
      <Text style={{ ...styles.title, ...props.titleStyle }}>
        {props.title}
      </Text>
      {props.icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 5,
    width: "100%",
    // borderWidth: 1,
    // marginHorizontal: 5,
  },
  title: {
    color: "#817E7E",
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
  },
});

export default AppPicker;
