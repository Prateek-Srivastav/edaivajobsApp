import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import AppText from "../components/AppText";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

function ProfileScreen({ navigation }) {
  const ICON_SIZE = 18;
  const ICON_COLOR = Colors.primary;

  const NormalText = (props) => (
    <Text style={styles.jobText}>{props.children}</Text>
  );

  const LargeText = (props) => (
    <Text style={styles.nameText}>{props.children}</Text>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/dummyDP.png")}
        style={{ height: 100, width: 100, marginBottom: 5 }}
      />
      <LargeText>Tom Anderson</LargeText>
      <NormalText>UI / UX Designer</NormalText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        <Card
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "45%",
            paddingVertical: 20,
          }}
        >
          <LargeText>3</LargeText>
          <NormalText>Jobs Applied</NormalText>
        </Card>
        <Card
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "45%",
            paddingVertical: 20,
          }}
        >
          <LargeText>1</LargeText>
          <NormalText>Interview</NormalText>
        </Card>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginBottom: 15,
        }}
      >
        <Card
          style={{
            alignItems: "center",
            width: "45%",
            alignItems: "center",
          }}
          touchable
          onPress={() => navigation.navigate("EditProfile")}
        >
          <FontAwesome
            name="edit"
            style={styles.icon}
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <NormalText>Edit Profile</NormalText>
        </Card>
        <Card
          style={{
            alignItems: "center",
            width: "45%",
          }}
          touchable
        >
          <SimpleLineIcons
            name="share-alt"
            style={styles.icon}
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <NormalText>View Profile</NormalText>
        </Card>
      </View>
      <View style={{ width: "90%" }}>
        <Card style={{ alignItems: "center" }} touchable>
          <FontAwesome5
            name="file-upload"
            style={styles.icon}
            size={ICON_SIZE}
            color={ICON_COLOR}
          />
          <NormalText>Upload Resume</NormalText>
        </Card>
      </View>
      <View style={styles.line} />
      <View style={{ width: "90%" }}>
        <Card style={{ alignItems: "center" }} touchable>
          <Ionicons
            name="log-out-outline"
            style={styles.icon}
            size={22}
            color={ICON_COLOR}
          />
          <NormalText>Sign Out</NormalText>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg,
    paddingTop: 40,
  },
  icon: {
    marginRight: 7,
    // borderWidth: 1,
    // padding: -10,
    // position: "absolute",
  },
  jobText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: Colors.primary,
  },
  line: {
    // height: 27,
    width: "70%",
    height: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#DBDBDB",
    elevation: 1,
    marginBottom: 10,
    opacity: 0.5,
  },
  nameText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
    marginBottom: 5,
  },
});

export default ProfileScreen;