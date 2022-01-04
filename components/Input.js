import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const Input = React.forwardRef((props, ref) => {
  const [inputState, setInputState] = useState({
    value: props.initialValue ? props.initialValue : "",
    isValid: false,
    touched: false,
  });
  const [showError, setShowError] = useState(false);

  const { onInputChange } = props;

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    setInputState({
      value: text,
      isValid: isValid,
      touched: true,
    });
    if (isValid) setShowError(false);
    else if (!isValid) setShowError(true);
  };

  const lostFocusHandler = (text) => {
    if (
      (inputState.touched && (inputState.value === "" || !inputState.value)) ||
      !inputState.isValid
    )
      setShowError(true);
    else setShowError(false);
  };

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  return (
    <View style={styles.formControl}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={{ ...styles.input, ...props.style }}>
        <TextInput
          {...props}
          style={styles.textInput}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          initialValue=""
          error={showError}
          isValid={inputState.isValid}
          ref={ref}
        />
        {props.icon && (
          <TouchableOpacity>
            <Ionicons
              name={props.icon}
              size={22}
              color={Colors.primary}
              style={styles.icon}
              onPress={props.onIconPress}
            />
          </TouchableOpacity>
        )}
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    marginTop: 10,
    // paddingHorizontal: 5,
    marginVertical: 13,
  },
  label: {
    fontFamily: "OpenSans-Regular",
    marginVertical: 5,
    color: "#817E7E",
    fontSize: 15,
  },
  icon: {
    marginStart: 5,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    // marginVertical: 10,
    // width: "100%",
    borderColor: Colors.primary,
    borderWidth: 1.4,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 10,
    // width: 200,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: "red",
  },
  textInput: {
    flex: 1,
    color: Colors.primary,
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
  },
});

export default Input;
