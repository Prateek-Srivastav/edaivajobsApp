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
import AppPicker from "./AppPicker";
import AppText from "./AppText";
import Card from "./Card";
import CardInput from "./CardInput";

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
  const [isLocationShown, setIsLocationShown] = useState(false);
  const [isJobTypeShown, setIsJobTypeShown] = useState(false);
  const [isSkillsShown, setIsSkillsShown] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [skillsItemArray, setSkillsItemArray] = useState([]);
  const [skillItemText, setSkillItemText] = useState();

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
    top.value = withSpring(0, SPRING_CONFIG);
  }

  const FilterItem = (props) => {
    return (
      <TouchableOpacity
        {...props}
        activeOpacity={0.5}
        style={styles.modalListItem}
      >
        <Text style={styles.itemText}>{props.title}</Text>
        <AntDesign
          name={props.isShown ? "minus" : "plus"}
          size={20}
          color={Colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const SkillsFilterItem = skillsItemArray.map((skillItem) => (
    <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#0AB4F14D",
        backgroundColor: "#B9ECFF4D",
        borderRadius: 3,
        marginLeft: 10,
        marginTop: 10,
      }}
    >
      <AppText style={{ marginHorizontal: 5, color: Colors.primary }}>
        {skillItem}
      </AppText>
      <TouchableOpacity
        onPress={() => {
          const index = skillsItemArray.indexOf(skillItem);
          console.log(index);
          skillsItemArray.splice(index, 1);
        }}
        style={{
          borderWidth: 1,
          margin: 3,
          borderColor: "#0AB4F14D",
          borderRadius: 3,
        }}
      >
        <Feather name="x" size={17} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  ));

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

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, width: "100%" }}
          >
            <FilterItem
              title="Location"
              onPress={() => setIsLocationShown(!isLocationShown)}
              isShown={isLocationShown}
            />
            {isLocationShown && (
              <View
                style={{
                  // padding: 10,
                  // borderWidth: 1,
                  paddingHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <AppPicker title="All Countries" />
                <View
                  style={{
                    flexDirection: "row",
                    width: "48.5%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AppPicker title="All States" />
                  <AppPicker title="City" />
                </View>
              </View>
            )}
            <FilterItem
              title="Job Type"
              onPress={() => setIsJobTypeShown(!isJobTypeShown)}
              isShown={isJobTypeShown}
            />
            {isJobTypeShown && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  justifyContent: "center",
                }}
              >
                <Card
                  touchable
                  style={{
                    marginHorizontal: 10,
                    justifyContent: "space-evenly",
                    flex: 1,
                  }}
                  onPress={() => {
                    if (selectedJobType === "internship")
                      setSelectedJobType("");
                    else setSelectedJobType("internship");
                  }}
                >
                  <View
                    style={{
                      ...styles.dotContainer,
                      borderColor:
                        selectedJobType === "internship"
                          ? Colors.primary
                          : "#ccc",
                    }}
                  >
                    <View
                      style={{
                        ...styles.dot,
                        backgroundColor:
                          selectedJobType === "internship"
                            ? Colors.primary
                            : "white",
                      }}
                    />
                  </View>
                  <AppText>Internship</AppText>
                </Card>
                <Card
                  onPress={() => {
                    if (selectedJobType === "ft") setSelectedJobType("");
                    else setSelectedJobType("ft");
                  }}
                  touchable
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <View
                    style={{
                      ...styles.dotContainer,
                      borderColor:
                        selectedJobType === "ft" ? Colors.primary : "#ccc",
                    }}
                  >
                    <View
                      style={{
                        ...styles.dot,
                        backgroundColor:
                          selectedJobType === "ft" ? Colors.primary : "white",
                      }}
                    />
                  </View>
                  <AppText>Full Time</AppText>
                </Card>
              </View>
            )}
            <FilterItem title="Experience" />
            <FilterItem
              title="Skills"
              isShown={isSkillsShown}
              onPress={() => setIsSkillsShown(!isSkillsShown)}
            />
            {isSkillsShown && (
              <>
                <CardInput
                  // style={{ marginBottom: 50 }}

                  placeholder="Press enter to add"
                  onChangeText={(val) => {
                    setSkillItemText(val);
                  }}
                  onSubmitEditing={() => {
                    setSkillsItemArray([...skillsItemArray, skillItemText]);
                    setSkillItemText("");
                  }}
                  value={skillItemText}
                />
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginBottom: 50,
                  }}
                >
                  {SkillsFilterItem}
                </View>
              </>
            )}
          </ScrollView>
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
  dot: {
    justifyContent: "center",
    alignItems: "center",
    height: 12,
    width: 12,
    overflow: "hidden",
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#ccc",
  },
  dotContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 9,
    height: 18,
    width: 18,
  },
  headingContainer: {
    // flex: 1,
    width: "100%",
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    // paddingRight: 20,
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
    // paddingRight: 20,
    // justifyContent: "space-between",
    alignItems: "center",
  },
  modalListItem: {
    width: "100%",
    flexDirection: "row",
    // borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 7,
    // marginTop: 15,
  },
});

export default Modal;
