import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import AppText from "../AppText";
import Colors from "../../constants/Colors";

const SmallText = (props) => (
  <Text style={styles.smallText}>{props.children}</Text>
);

const DetailHeading = ({ label, onPress }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      // borderWidth: 1,
      width: "100%",
    }}
  >
    <SmallText>{label}</SmallText>

    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* <View style={styles.buttonContainer}> */}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Feather name="edit-3" size={17} color={Colors.primary} />
        </View>
      </TouchableOpacity>

      {/* </View> */}
    </View>
  </View>
);

function PersonalDetails({ data, onPress }) {
  const { email, mobile, dob, address1, address2, city, state, country } = data;

  const address = `${address1 !== "" ? address1 + ", " : ""}${
    address2 !== "" ? address2 + ", " : ""
  }${city !== "" ? city + ", " : ""}${state !== "" ? state + ", " : ""}${
    country !== "" ? country : ""
  }`;

  return (
    <View style={{ marginHorizontal: 15 }}>
      <DetailHeading label="Personal Details" onPress={onPress} />
      {email && email !== "" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText>EMAIL:{"  "}</AppText>
          <AppText style={{ color: Colors.black }}>{email} </AppText>
        </View>
      ) : null}
      {mobile && mobile !== "" ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
        >
          <AppText>PHONE:{"  "}</AppText>
          <AppText style={{ color: Colors.black }}>{mobile} </AppText>
        </View>
      ) : null}
      {dob && dob !== "" ? (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
        >
          <AppText>DATE OF BIRTH:{"  "}</AppText>
          <AppText style={{ color: Colors.black }}>{dob} </AppText>
        </View>
      ) : null}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}
      >
        <AppText>ADDRESS:{"  "}</AppText>
        <AppText style={{ color: Colors.black }}>{address}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    width: 36,
    // borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    right: -9,
  },
  smallText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 15.5,
    color: Colors.primary,
  },
});

export default PersonalDetails;
