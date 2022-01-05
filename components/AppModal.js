import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  useWindowDimensions,
  TouchableNativeFeedback,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  // Dimensions,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Feather, AntDesign } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";

const { width, height } = Dimensions.get("screen");

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 600,
};

function AppModal(props) {
  const dimensions = useWindowDimensions();

  const top = useSharedValue(Dimensions.get("screen").height);

  const style = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    // onEnd() {
    //   if(top.value?dime)
    // }
  });

  const setIsPressed = (value) => {
    props.sendData(value);
  };

  if (props.isPressed) {
    top.value = withSpring(0, SPRING_CONFIG);
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.modalContainer, style]}>
        <View style={styles.modalContentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{props.heading}</Text>
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback
                onPress={() => {
                  top.value = withSpring(dimensions.height + 50, SPRING_CONFIG);
                  setIsPressed(false);
                }}
              >
                <View style={styles.button}>
                  <Feather name="x" size={24} color={Colors.primary} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={styles.line} />
          {props.children}
          <View
            style={{
              flexDirection: "row",
              // flex: 2,
              width: "100%",
              // flexWrap: "wrap",
              justifyContent: "center",
              // borderWidth: 1,
              // alignSelf: "flex-end",
              // position:"absolute",
              bottom: Dimensions.get("window").height / 15,
            }}
          >
            {props.isReset && (
              <CustomButton
                title="Reset"
                titleStyle={{ color: Colors.primary }}
                style={{
                  backgroundColor: "white",
                  elevation: 3,
                  width: `${100 / props.numOfButton}%`,
                  marginRight: 10,
                }}
                onPress={() => {
                  top.value = withSpring(dimensions.height, SPRING_CONFIG);
                  setIsPressed(false);
                }}
              />
            )}
            <CustomButton
              title="Apply"
              style={{ width: `${100 / props.numOfButton}%` }}
              onPress={() => {
                top.value = withSpring(dimensions.height, SPRING_CONFIG);
                setIsPressed(false);
              }}
            />
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: "hidden",
    position: "absolute",
    right: -15,
  },

  headingContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headingText: {
    color: Colors.primary,
    fontSize: 19,
    fontFamily: "OpenSans-SemiBold",
  },
  line: {
    // height: 27,
    width: width,
    height: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.cardBlue,
    elevation: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // top: dimensions.height,
    // width: "100%",
    // borderWidth: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // elevation: 5,
    // padding: 20,
    // paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 5,
  },
  modalContentContainer: {
    backgroundColor: Colors.secondary,
    top: Dimensions.get("window").height / 10,
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 20,
    // paddingRight: 20,
    // justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AppModal;
