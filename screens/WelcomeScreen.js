import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

import Colors from "../constants/Colors";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/3918929.png")}
        style={{ height: 300, width: 300 }}
      />
      <TouchableOpacity
        // onPress={submitHandler}
        // disabled={buttonDisabled}
        onPress={() => navigation.navigate("Login")}
        activeOpacity={0.4}
        style={{
          ...styles.button,
          backgroundColor: Colors.primary,
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
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <View style={styles.line} />
        <View>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              fontFamily: "OpenSans-Regular",
              color: "#817E7E",
              marginHorizontal: 7,
            }}
          >
            Continue with
          </Text>
        </View>
        <View style={styles.line} />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ ...styles.thirdPartyAuthContainer, marginEnd: 20 }}
        >
          <Image
            source={require("../assets/google.png")}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
          />
          <Text style={styles.thirdPartyAuthText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.thirdPartyAuthContainer}
        >
          <Image
            source={require("../assets/linkedin.png")}
            style={{ height: 22, width: 22 }}
            resizeMode="contain"
          />
          <Text style={styles.thirdPartyAuthText}>LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    padding: 20,
  },
  thirdPartyAuthContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    elevation: 3,
    padding: 10,
    borderRadius: 4,
    padding: 5,
  },
  thirdPartyAuthText: {
    fontFamily: "OpenSans-Regular",
    textAlign: "center",
    color: Colors.primary,
    // opacity: 0.5,
    fontSize: 13,
    margin: 8,
  },
  line: {
    flex: 1,
    height: 0.6,
    backgroundColor: "#C8C8C8",
  },
  button: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // padding: 15,
    marginVertical: 30,

    borderRadius: 4,
    alignSelf: "center",
  },
});

export default WelcomeScreen;
