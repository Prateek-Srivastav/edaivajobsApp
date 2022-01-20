import React, { useState } from "react";
import {
  FlatList,
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Card from "../../components/Card";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";
import AppText from "../../components/AppText";
import CardInput from "../../components/CardInput";
import ExperienceCard from "../../components/ExperienceCard";
import dummyData from "../../dummyData.js/data";

const { width, height } = Dimensions.get("window");

function EditProfileScreen(props) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState();
  const [origin, setOrigin] = useState("");

  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (origin === "birthDate") {
      let date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;

      if (date <= 9) date = "0" + date;
      if (month < 10) month = "0" + month;

      setSelectedBirthDate(
        date + "/" + month + "/" + currentDate.getFullYear()
      );
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const SmallText = (props) => (
    <Text style={styles.smallText}>{props.children}</Text>
  );

  const NormalText = (props) => (
    <Text style={styles.normalText}>{props.children}</Text>
  );

  const LargeText = (props) => (
    <Text style={styles.largeText}>{props.children}</Text>
  );

  const DetailHeading = ({ label, onPress }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        width: "100%",
      }}
    >
      <SmallText>{label}</SmallText>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Feather name="edit-3" size={17} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* </View> */}
      </View>
    </View>
  );

  const AddDetails = (props) => {
    return (
      <>
        <View
          style={{
            marginHorizontal: 15,
            marginBottom: props.isNotLine ? 20 : 0,
          }}
        >
          <SmallText>{props.label}</SmallText>
          {props.children}
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <AntDesign
              name="plus"
              size={17}
              color={Colors.primary}
              style={{ marginRight: 10 }}
            />
            <NormalText>Add {props.label}</NormalText>
          </TouchableOpacity>
        </View>
        {!props.isNotLine && <View style={styles.line} />}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          elevation: 3,
          borderRadius: 9,
          paddingVertical: 20,
          backgroundColor: "white",
          marginBottom: 5,
        }}
      >
        <Image
          source={require("../../assets/dummyDP.png")}
          style={{ height: 70, width: 70, marginRight: 5, marginLeft: 8 }}
        />
        <View style={{ width: "70%", marginRight: 5 }}>
          <LargeText>Tom Anderson</LargeText>
          <Card style={{ justifyContent: "flex-start", paddingVertical: 5 }}>
            <NormalText>UI / UX Designer</NormalText>
          </Card>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginHorizontal: 15 }}>
          <DetailHeading
            label="Personal Details"
            onPress={() =>
              navigation.navigate("EditProfileDetail", {
                component: "personal",
              })
            }
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText>EMAIL:{"  "}</AppText>
            <AppText style={{ color: Colors.black }}>xyz@gmail.com </AppText>
          </View>
        </View>

        <View style={{ ...styles.line, marginTop: 15 }} />
        <View style={{ marginHorizontal: 15 }}>
          <DetailHeading label="About" />
          <CardInput
            // style={{ marginBottom: 10 }}
            numberOfLines={6}
            multiline
            placeholder="Tell something about you..."
          />
        </View>
        <View style={styles.line} />
        <AddDetails
          label="Experience"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "exp" })
          }
        >
          {/* <Text>Hello Experience</Text> */}
        </AddDetails>
        <AddDetails
          label="Academics"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "acad" })
          }
        >
          {/* <Text>Hello Academics</Text> */}
        </AddDetails>
        <AddDetails
          label="Skills"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "skills" })
          }
        >
          {/* <Text>Hello Skills</Text> */}
        </AddDetails>
        <AddDetails
          label="Projects"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "projs" })
          }
        >
          {/* <Text>Hello Projects</Text> */}
        </AddDetails>
        <AddDetails
          label="Certifications"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "certs" })
          }
        >
          {/* <Text>Hello Certifications</Text> */}
        </AddDetails>
        <AddDetails
          label="Publications"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "pubs" })
          }
        >
          {/* <Text>Hello Publications</Text> */}
        </AddDetails>
        <AddDetails
          label="Patents"
          onPress={() =>
            navigation.navigate("EditProfileDetail", { component: "patents" })
          }
        >
          {/* <Text>Hello Patents</Text> */}
        </AddDetails>
        <AddDetails
          label="Achievements"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "achievements",
            })
          }
        >
          {/* <Text>Hello Achievements</Text> */}
        </AddDetails>
        <AddDetails
          isNotLine
          label="Social Links"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "socialLinks",
            })
          }
        >
          {/* <Text>Hello Social Links</Text> */}
        </AddDetails>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            maximumDate={new Date()}
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    width: 36,
    // borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    right: -9,
  },
  buttonContainer: {
    height: 36,
    width: 36,
    // borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    // position: "absolute",
    // right: 30,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "space-around",
    backgroundColor: Colors.bg,
    // paddingTop: 40,
  },
  line: {
    // height: 27,
    // alignSelf: "center",
    width: "85%",
    height: 1.6,
    borderRadius: 10,
    // marginHorizontal: 5,
    alignSelf: "center",
    backgroundColor: Colors.grey,
    elevation: 1,
    marginTop: 10,
    marginBottom: 20,
    opacity: 0.1,
  },
  smallText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 15.5,
    color: Colors.primary,
  },
  normalText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: Colors.primary,
  },
  largeText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
    // marginBottom: 5,
  },
});

export default EditProfileScreen;
