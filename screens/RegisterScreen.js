import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import Input from "../components/Input";
import Colors from "../constants/Colors";

const EMAIL = "test@test.com";
const PASSWORD = "test1234";

function RegisterScreen(props) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [logIn, setLogIn] = useState();
  const [isInvalid, setIsInvalid] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

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

  if (logIn) return <JobsListingScreen />;

  return (
    <View style={styles.screen}>
      <ScrollView
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.authContainer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={styles.authText}>Welcome.</Text>
        </View>
        {/* {isInvalid && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Invalid email/password</Text>
          </View>
        )} */}

        <Input
          id="firstName"
          label="First Name"
          keyboardType="default"
          required
          minLength={3}
          autoCapitalize="words"
          errorText="Please enter a valid name."
          onInputChange={inputFirstNameHandler}
        />

        <Input
          id="lastName"
          label="Last Name"
          keyboardType="default"
          required
          minLength={3}
          autoCapitalize="words"
          errorText="Please enter a valid name."
          onInputChange={inputLastNameHandler}
        />
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
          icon="ios-eye"
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

        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.forgotPassText}>
            By clicking Sign Up, you agree to our{" "}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontFamily: "OpenSans-Regular",
                color: Colors.primary,
                fontSize: 12.8,
              }}
            >
              Terms of Use
            </Text>
          </TouchableOpacity>
          <Text style={styles.forgotPassText}> and our </Text>
          <TouchableOpacity>
            <Text
              style={{
                flex: 1,
                fontFamily: "OpenSans-Regular",
                color: Colors.primary,
                fontSize: 12.8,
              }}
            >
              Privacy Policy.
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={submitHandler}
          // disabled={buttonDisabled}
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
            Signup
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
              Sign up with
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
    // flex: 1,
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
    fontSize: 12.8,
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
    // padding: 15,
    marginVertical: 30,

    borderRadius: 4,
    alignSelf: "center",
  },
});

export default RegisterScreen;
