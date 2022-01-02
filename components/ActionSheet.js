import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  useWindowDimensions,
  // Dimensions,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import CustomButton from "./CustomButton";

// const { width, height } = Dimensions.get("screen");

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 600,
};

function ActionSheet(props) {
  const dimensions = useWindowDimensions();

  const top = useSharedValue(dimensions.height);

  const style = useAnimatedStyle(() => {
    return {
      top: top.value + 40,
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
    console.log("pressed");
    top.value = withSpring(dimensions.height / 10, SPRING_CONFIG);
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, style]}>
        <Text>Sheet</Text>
        <CustomButton
          title="Close Sheet"
          // style={{ position: "absolute" }}
          onPress={() => {
            top.value = withSpring(dimensions.height, SPRING_CONFIG);
            setIsPressed(false);
          }}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // top: dimensions.height,
    // width: "100%",
    // borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 5,
  },
});

export default ActionSheet;
