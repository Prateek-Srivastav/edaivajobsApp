import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import AppText from "../../components/AppText";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { Lock } from "../../assets/svg/icons";

function MainScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  const inputEmailHandler = useCallback((inputValue, inputValidity) => {
    setbuttonDisabled(!inputValidity);
    setEmail(inputValue);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: 50 }}
      style={styles.container}
    >
      <View style={{ marginStart: 30, marginBottom: 20 }}>
        <Lock />
      </View>
      <Text style={styles.boldText}>FORGOT{"\n"}PASSWORD</Text>
      <AppText style={{ color: Colors.black, marginTop: 15, marginBottom: 40 }}>
        Provide your account’s email for which you want to reset your password
      </AppText>
      <Input
        id="email"
        placeholder="Email"
        keyboardType="email-address"
        required
        email
        autoCapitalize="none"
        errorText="Please enter a valid email address."
        onInputChange={inputEmailHandler}
      />
      <CustomButton
        title="Next"
        style={{
          marginTop: 15,
          backgroundColor: buttonDisabled ? "#ccc" : Colors.primary,
        }}
        onPress={() => navigation.navigate("PasswordResetMethod", { email })}
        disabled={buttonDisabled}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: 15,
  },
  boldText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 45,
    color: Colors.black,
  },
});

export default MainScreen;
