import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import AppText from "./AppText";

function AppPicker(props) {
  const { onPress } = props;

  return (
    <View
      style={{
        ...styles.container,
        ...props.style,
      }}
    >
      {props.label && (
        <AppText
          style={{
            alignSelf: "flex-start",
            fontSize: 13,
            // marginTop: 10,
            marginVertical: 5,
          }}
        >
          {props.label}
        </AppText>
      )}
      {/* <View style={{ ...styles.picker }}> */}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.picker}
        // style={{
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   // flex: 1,
        //   // borderWidth: 1,
        //   // width: "100%",
        // }}
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
      {/* {props.children ? props.children : null} */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flex: 1,
    // borderWidth: 1,
    marginBottom: 10,
  },
  picker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    backgroundColor: "white",
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // margin: 5,
    // marginVertical: 5,
    // width: "100%",
    // flex: 1,
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
