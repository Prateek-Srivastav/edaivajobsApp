import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Input from "../components/Input";

import Colors from "../constants/Colors";

const EMAIL = "test@test.com";
const PASSWORD = "test1234";

function LoginScreen(props) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  const inputFirstNameHandler = useCallback((inputValue, inputValidity) => {
    setbuttonDisabled(!inputValidity);
    setFirstName(inputValue);
  }, []);

  const inputLastNameHandler = useCallback((inputValue, inputValidity) => {
    setbuttonDisabled(!inputValidity);
    setLastName(inputValue);
  }, []);

  const inputEmailHandler = useCallback((inputValue, inputValidity) => {
    setbuttonDisabled(!inputValidity);
    setEmail(inputValue);
    setIsInvalid(false);
  }, []);

  const inputPswrdHandler = useCallback((inputValue, inputValidity) => {
    setbuttonDisabled(!inputValidity);
    setPassword(inputValue);
    setIsInvalid(false);
  }, []);

  const submitHandler = () => {
    if (email === EMAIL && password === PASSWORD) setLogIn(true);
    else setIsInvalid(true);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        // showsVerticalScrollIndicator={false}s
        contentContainerStyle={styles.authContainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <Text style={styles.authText}>Sign in</Text>
        </View>
        {isInvalid && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Invalid email/password</Text>
          </View>
        )}

        <Input
          id="email"
          label="Email"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={inputEmailHandler}
        />
        <Input
          id="password"
          label="Password"
          icon={isPasswordShown ? "ios-eye-off" : "ios-eye"}
          onIconPress={() => setIsPasswordShown(!isPasswordShown)}
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorText="Please enter a valid password."
          onInputChange={inputPswrdHandler}
        />

        <TouchableOpacity
          style={{
            marginTop: -5,
            alignItems: "flex-start",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text style={styles.forgotPassText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={submitHandler}
          activeOpacity={0.4}
          style={{
            ...styles.button,
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F9FBFB",
    // backgroundColor: "white",
  },
  authContainer: {
    // width: "100%",
    // alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#F9FBFB",
    flex: 1,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // elevation: 1,
    // borderRadius: 4,
    padding: 20,
    // marginBottom: 50,
    // marginHorizontal: 10,
  },
  authText: {
    fontFamily: "OpenSans-Medium",
    // textAlign: "center",
    fontSize: 42,
    // margin: 10,
    // marginBottom: 15,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    color: "red",
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
    // marginHorizontal: 10,
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
  forgotPassText: {
    fontFamily: "OpenSans-Regular",
    color: "#817E7E",
    fontSize: 13,
    // textAlign: "right",
  },
  textInput: {
    backgroundColor: "white",
    marginVertical: 10,
    width: "100%",
  },
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

export default LoginScreen;
