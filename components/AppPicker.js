import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

function AppPicker(props) {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableOpacity
        {...props}
        activeOpacity={0.4}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ ...styles.title, ...props.titleStyle }}>
          {props.title}
        </Text>
        {props.icon ? (
          props.icon
        ) : (
          <Ionicons
            name={props.isShown ? "chevron-up" : "chevron-down"}
            size={17}
            color={props.iconColor ? props.iconColor : Colors.grey}
          />
        )}
      </TouchableOpacity>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
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
