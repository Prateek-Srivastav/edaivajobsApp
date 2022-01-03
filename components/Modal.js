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
  // Dimensions,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { Picker } from "@react-native-picker/picker";

import { Ionicons, Feather } from "@expo/vector-icons";

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

function Modal(props) {
  const dimensions = useWindowDimensions();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [isLocationShown, setIsLocationShown] = useState(false);

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
    top.value = withSpring(0, SPRING_CONFIG);
  }

  const FilterItem = (props) => {
    return (
      <TouchableOpacity {...props} style={styles.modalListItem}>
        <Ionicons name="add" size={22} color={Colors.primary} />
        <Text style={styles.itemText}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.modalContainer, style]}>
        <View style={styles.modalContentContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Filter</Text>
            <View style={styles.buttonContainer}>
              <TouchableNativeFeedback
                onPress={() => {
                  top.value = withSpring(dimensions.height, SPRING_CONFIG);
                  setIsPressed(false);
                }}
              >
                <View style={styles.button}>
                  <Feather name="x" size={24} color={Colors.primary} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          <View style={{ flex: 1, width: "100%" }}>
            <FilterItem
              title="Location"
              onPress={() => setIsLocationShown(!isLocationShown)}
            />
            {isLocationShown && (
              <View>
                <Text>Location</Text>
              </View>
            )}
            <FilterItem title="Job Type" />
            <FilterItem title="Experience" />
            <FilterItem title="Skills" />
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
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
            <CustomButton
              title="Reset"
              titleStyle={{ color: Colors.primary }}
              style={{
                backgroundColor: "white",
                elevation: 3,
                width: "50%",
                marginRight: 10,
              }}
              onPress={() => {
                top.value = withSpring(dimensions.height, SPRING_CONFIG);
                setIsPressed(false);
              }}
            />
            <CustomButton
              title="Apply"
              style={{ width: "50%" }}
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
    // flex: 1,
    width: "100%",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headingText: {
    color: Colors.primary,
    fontSize: 19,
    fontFamily: "OpenSans-SemiBold",
  },
  itemText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    color: Colors.primary,
    marginHorizontal: 7,
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
    paddingRight: 20,
    // justifyContent: "space-between",
    alignItems: "center",
  },
  modalListItem: {
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1,
    // justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default Modal;
