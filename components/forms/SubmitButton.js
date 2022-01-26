import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      onPress={handleSubmit}
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
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default SubmitButton;
