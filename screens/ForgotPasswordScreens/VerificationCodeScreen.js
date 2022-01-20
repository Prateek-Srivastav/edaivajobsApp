import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AppText from "../../components/AppText";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";

const CustomInput = React.forwardRef((props, ref) => {
  const [borderColor, setBorderColor] = useState("#E1E1E1");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const inputChange = (text) => {
    if (!isNaN(parseInt(text))) {
      setBackgroundColor(Colors.cardBlue);
      setBorderColor(Colors.primary);
    } else {
      setBackgroundColor("#FFFFFF");
      setBorderColor("#E1E1E1");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth: 1,
        borderRadius: 4,
        borderColor,
        // flex: 1,
        width: 50,
        height: 50,
        paddingHorizontal: 19,
        backgroundColor,
      }}
    >
      <TextInput
        {...props}
        style={{
          color: Colors.black,
          width: 30,
          fontSize: 20,
          textAlign: "center",
          fontFamily: "OpenSans-SemiBold",
        }}
        maxLength={1}
        keyboardType="numeric"
        onChangeText={inputChange}
        selectTextOnFocus
        ref={ref}
      />
    </View>
  );
});

function VerificationCodeScreen({ navigation }) {
  const [verificationCode, setVerificationCode] = useState([]);

  const inputChange = (text) => {
    if (!isNaN(parseInt(text))) {
      setVerificationCode([...verificationCode, text]);
      console.log(verificationCode);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>VERIFICATION{"\n"}CODE</Text>
      <AppText style={{ color: Colors.black, marginTop: 15 }}>
        The One time Password is sent.
      </AppText>
      <TouchableOpacity>
        <AppText
          style={{
            color: Colors.primary,
            fontFamily: "OpenSans-Italic",
            textDecorationLine: "underline",
            fontSize: 15,
          }}
        >
          Resend
        </AppText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 50,
          marginBottom: 10,
        }}
      >
        <CustomInput />
        <CustomInput />
        <CustomInput />
        <CustomInput />
        <CustomInput />
      </View>
      <CustomButton
        title="Verify"
        onPress={() => navigation.navigate("NewPassword")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 45,
    color: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: Colors.bg,
    paddingVertical: 50,
  },
});

export default VerificationCodeScreen;
