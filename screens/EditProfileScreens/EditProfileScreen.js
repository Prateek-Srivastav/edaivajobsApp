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
} from "react-native";
import AppPicker from "../../components/AppPicker";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

import Card from "../../components/Card";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";
import AppText from "../../components/AppText";
import CardInput from "../../components/CardInput";
import ExperienceCard from "../../components/ExperienceCard";
import dummyData from "../../dummyData.js/data";

const { width, height } = Dimensions.get("window");

function EditProfileScreen(props) {
  const [isDetailShown, setIsDetailShown] = useState(false);
  const [isAboutShown, setIsAboutShown] = useState(false);
  const [isExperienceShown, setIsExperienceShown] = useState(false);
  const [isAddExperienceShown, setIsAddExperienceShown] = useState(false);
  const [isAcademicsShown, setIsAcademicsShown] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState();
  const [origin, setOrigin] = useState("");

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

  const DetailsCard = (props) => {
    const { label, iconName, title } = props;

    let placeholder;

    if (title) placeholder = title;
    else placeholder = selectedBirthDate ? selectedBirthDate : "Date";

    return (
      <View style={{ width: "100%", alignItems: "center", ...props.style }}>
        <AppText
          style={{ alignSelf: "flex-start", fontSize: 13, marginTop: 10 }}
        >
          {label}
        </AppText>
        <AppPicker
          {...props}
          icon={
            iconName ? (
              <MaterialIcons name={iconName} size={17} color="#817E7E" />
            ) : null
          }
          title={placeholder}
          style={{ marginBottom: 10 }}
        />
      </View>
    );
  };

  const DetailsInput = (props) => {
    const { label, placeholder } = props;

    return (
      <View style={{ marginTop: 5, width: "100%" }}>
        {/* {label && (
          <AppText style={{ alignSelf: "flex-start", fontSize: 13 }}>
            {label}
          </AppText>
        )} */}
        <CardInput {...props} placeholder={placeholder} />
      </View>
    );
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

  const NormalText = (props) => (
    <Text style={styles.jobText}>{props.children}</Text>
  );

  const LargeText = (props) => (
    <Text style={styles.nameText}>{props.children}</Text>
  );

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
      <ScrollView style={{ paddingHorizontal: 10 }}>
        <AppPicker
          onPress={() => setIsDetailShown(!isDetailShown)}
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          iconColor={Colors.primary}
          title="Personal Details"
          isShown={isDetailShown}
        />

        <AppPicker
          onPress={() => setIsAboutShown(!isAboutShown)}
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          iconColor={Colors.primary}
          title="About"
          isShown={isAboutShown}
        >
          {isAboutShown && (
            <>
              <CardInput
                inputStyle={{ marginTop: 10 }}
                numberOfLines={6}
                multiline
                placeholder="Tell something about you..."
              />
            </>
          )}
        </AppPicker>
        <AppPicker
          onPress={() => setIsExperienceShown(!isExperienceShown)}
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          iconColor={Colors.primary}
          title="Experience"
          isShown={isExperienceShown}
        >
          {isExperienceShown && (
            <FlatList
              nestedScrollEnabled
              contentContainerStyle={{
                paddingHorizontal: 15,
                // paddingBottom: 20,
              }}
              style={{
                width: "110%",
                height: height / 2,
                marginTop: 10,
                marginBottom: 10,
              }}
              data={dummyData}
              renderItem={(itemData) => (
                <ExperienceCard
                  disabled
                  heading={itemData.item.heading}
                  companyName={itemData.item.companyName}
                  jobType={itemData.item.jobType}
                  location={itemData.item.location}
                  description={itemData.item.description}
                  postedDate={itemData.item.postedDate}
                  isApplied={itemData.item.isApplied}
                  responsibility={itemData.item.responsibility}
                />
              )}
            />
          )}
        </AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={
            <AntDesign
              name={isAcademicsShown ? "minus" : "plus"}
              size={17}
              color={Colors.primary}
            />
          }
          title="Academics"
          onPress={() => setIsAcademicsShown(!isAcademicsShown)}
        >
          {isAcademicsShown && <></>}
        </AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Skills"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Projects"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Certifications"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Publications"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Patents"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%" }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={<AntDesign name="plus" size={17} color={Colors.primary} />}
          title="Achievements"
        ></AppPicker>
        <AppPicker
          style={{ alignSelf: "center", width: "97%", marginBottom: 30 }}
          titleStyle={{
            color: Colors.primary,
            fontSize: 15,
            fontFamily: "OpenSans-Medium",
          }}
          icon={
            <Ionicons name="chevron-down" size={17} color={Colors.primary} />
          }
          title="Social Links"
        ></AppPicker>
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
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "space-around",
    backgroundColor: Colors.bg,
    // paddingTop: 40,
  },
  jobText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: Colors.primary,
  },
  nameText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
    // marginBottom: 5,
  },
});

export default EditProfileScreen;
