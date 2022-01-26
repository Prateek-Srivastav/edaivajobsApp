import React, { useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import { AppForm, AppFormField, SubmitButton } from "../../components/forms";
import AppText from "../../components/AppText";
import Colors from "../../constants/Colors";
import CustomButton from "../../components/CustomButton";
import Input from "../../components/Input";
import { Lock } from "../../assets/svg/icons";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function MainScreen({ navigation }) {
  const [email, setEmail] = useState();

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
      {/* <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onTextChange={inputEmailHandler}
      />
      <CustomButton
        title="Next"
        style={{
          marginTop: 15,
          backgroundColor: buttonDisabled ? "#ccc" : Colors.primary,
        }}
        onPress={() => navigation.navigate("PasswordResetMethod", { email })}
        disabled={buttonDisabled}
      /> */}

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={({ email }) =>
          navigation.navigate("PasswordResetMethod", { email })
        }
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <SubmitButton title="Next" />
      </AppForm>
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
