import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import AppModal from "../components/AppModal";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import JobDetails from "../components/JobDetails";
import { BuildingIcon, Location, Share } from "../assets/svg/icons";
import RescheduleModalContent from "../components/RescheduleModalContent";

const { width, height } = Dimensions.get("screen");

function ApplicationStatusScreen({ route }) {
  const [showDetail, setShowDetail] = useState(1);
  const [isPressed, setIsPressed] = useState(false);

  // const { width } = Dimensions.get("screen");
  const [position] = useState(new Animated.ValueXY());

  const item = route.params.itemData.item;

  const getData = (val) => {
    setIsPressed(false);
  };

  const animStyles = {
    top: 0,
    borderRadius: 20,
    height: 3,
    width: width / 6,
    backgroundColor: Colors.primary,
    transform: position.getTranslateTransform(),
  };

  const StatusMessage = () => {
    let color;
    let message;

    if (item.applicationStatus === "underReview") {
      color = "#AEB11c";
      message =
        "Congratulations, you have successfully quaified for this position.";
    } else if (item.applicationStatus === "rejected") {
      color = "#F11212";
      message =
        "We are sorry to inform you that you are not eligible for this position.";
    }

    return (
      <AppText style={{ ...styles.statusMessage, color }}>{message}</AppText>
    );
  };

  const InterviewDetail = () => {
    // if (item.applicationStatus === "interviewing") {
    //   return (
    //     <View
    //       style={{
    //         paddingHorizontal: 15,
    //         width,
    //         // flex: 1,
    //       }}
    //     >
    //       <AppText>
    //         Your application has reviewed, scheduled interviews will be visible
    //         soon.
    //       </AppText>
    //     </View>
    //   );
    // }

    return (
      <View style={{ flex: 1, paddingHorizontal: 15, width }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              // left: -2,
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 4,
              // overflow: "hidden",
              backgroundColor: "#FFFFFF",
              padding: 15,
              paddingRight: 5,
              width: "80%",
            }}
          >
            <AppText
              style={{
                fontSize: 16,
                color: Colors.primary,
                fontFamily: "OpenSans-Medium",
                marginBottom: 5,
              }}
            >
              Round 1
            </AppText>
            <AppText>Interview is scheduled virtually on</AppText>
            <View style={{ flexDirection: "row" }}>
              <AppText
                style={{
                  fontSize: 15,
                  color: Colors.primary,
                  fontFamily: "OpenSans-Medium",
                  marginBottom: 5,
                }}
              >
                Oct 12, 2021 from 1:00 PM to 2:00 PM
              </AppText>
            </View>
            <AppText style={{ marginTop: 10 }}>
              Not available at the moment?
            </AppText>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                setIsPressed(true);
              }}
            >
              <Feather name="repeat" size={13} color={Colors.primary} />
              <AppText
                style={{
                  color: Colors.primary,
                  fontFamily: "OpenSans-Italic",
                  marginLeft: 5,
                  textDecorationLine: "underline",
                  fontSize: 15,
                }}
              >
                Reschedule
              </AppText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.primary,
              width: "20%",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Share color="white" />
            <AppText
              textAlign="center"
              style={{ color: "white", marginTop: 8 }}
            >
              Meeting
            </AppText>
            <AppText textAlign="center" style={{ color: "white" }}>
              Link
            </AppText>
          </View>
        </View>
        <View style={styles.line} />
        <View
          style={{
            flexDirection: "row",
            // width,

            justifyContent: "center",
            // borderWidth: 1,
            // flex: 1,
          }}
        >
          <View
            style={{
              right: -3,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#33A000",
              width: "15%",
              // overflow: "hidden",
              backgroundColor: "rgba(51, 160, 0, 0.15)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather
              name="check"
              size={20}
              color="#33A000"
              // style={{ marginRight: 5 }}
            />
          </View>
          <View
            style={{
              left: -2,
              borderWidth: 1,
              borderColor: Colors.primary,
              borderRadius: 4,
              // overflow: "hidden",
              backgroundColor: "#FFFFFF",
              padding: 15,
              width: "87%",
            }}
          >
            <AppText
              style={{
                fontSize: 16,
                color: Colors.primary,
                fontFamily: "OpenSans-Medium",
                marginBottom: 5,
              }}
            >
              Round 1
            </AppText>
            <AppText>Interview was scheduled virtually on</AppText>
            <View style={{ flexDirection: "row" }}>
              <AppText
                style={{
                  fontSize: 15,
                  color: Colors.primary,
                  fontFamily: "OpenSans-Medium",
                  marginBottom: 5,
                }}
              >
                Oct 12, 2021 from 1:00 PM to 2:00 PM
              </AppText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const Description = ({ show }) => {
    const animate = (value) => {
      Animated.timing(position, {
        toValue: { x: value, y: 0 },
        duration: 160,
        useNativeDriver: true,
      }).start();
    };

    let detail;
    if (show === 1) {
      detail = <InterviewDetail />;
      animate(width / 5);
    } else if (show === 2) {
      detail = <JobDetails />;
      animate(3 * (width / 5));
    }

    return (
      <ScrollView
        style={{
          // paddingHorizontal: 20,
          paddingBottom: 20,
          width: "100%",
          // marginTop: 10,
          // marginBottom: 10,
        }}
      >
        {show === 1 && (
          <AppText
            style={{
              color: Colors.black,
              textAlign: "justify",
            }}
          >
            {detail}
          </AppText>
        )}
        {show === 2 && detail}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.bg,
          alignItems: "center",
        }}
      >
        <Card style={styles.card}>
          <Text style={styles.heading}>{item.heading}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 7,
            }}
          >
            <BuildingIcon color="#BDEEFF" />

            <Text style={styles.text}>{item.companyName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Location color="#BDEEFF" />

            <Text style={styles.text}>{item.location}</Text>
          </View>
          <StatusMessage />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity onPress={() => setShowDetail(1)}>
              <AppText style={styles.detailsHeading}>INTERVIEW</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDetail(2)}>
              <AppText style={styles.detailsHeading}>JOB DETAILS</AppText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              // borderWidth: 1,
              width: "100%",
              // marginHorizontal: 20,
              marginTop: 3,
              marginBottom: -10,
            }}
          >
            <Animated.View style={animStyles} />
          </View>
        </Card>
        <Description show={showDetail} />
      </View>
      <AppModal
        numOfButton={2}
        heading="Reschedule"
        isReset
        firstButtonTitle="+  Add Another"
        secondButtonTitle="Submit"
        isPressed={isPressed}
        sendData={getData}
      >
        <RescheduleModalContent />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    top: -5,
    flexDirection: "column",
    // flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    paddingTop: 20,
  },
  cardBlue: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 3,
    backgroundColor: Colors.cardBlue,
    paddingVertical: 3,
    marginRight: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  detailsHeading: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
    color: Colors.primary,
  },
  heading: {
    fontFamily: "OpenSans-Bold",
    fontSize: 25,
    color: Colors.primary,
  },
  line: {
    // height: 27,
    width: "70%",
    height: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: "#DBDBDB",
    elevation: 1,
    alignSelf: "center",
    opacity: 0.5,
  },
  requirementText: {
    fontFamily: "OpenSans-Medium",
    color: Colors.black,
    fontSize: 15,
    marginStart: 5,
  },
  statusMessage: {
    marginVertical: 10,
  },
  text: {
    fontFamily: "OpenSans-Medium",
    color: Colors.primary,
    fontSize: 15.5,
    marginStart: 3,
  },
});

export default ApplicationStatusScreen;
