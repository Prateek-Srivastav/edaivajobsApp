import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import AppText from "./AppText";
import Colors from "../constants/Colors";
import HorizontalLine from "./HorizontalLine";
import {
  Wishlist,
  Preference,
  Profile,
  Help,
  Privacy,
  Document,
  SignOut,
} from "../assets/svg/icons";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import cache from "../utilities/cache";

const NormalText = (props) => (
  <Text style={styles.normalText}>{props.children}</Text>
);

const LargeText = (props) => (
  <Text style={styles.largeText}>{props.children}</Text>
);

const OtherInfosComponent = ({ icon, detail }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 10,
    }}
  >
    {icon}
    <NormalText>{detail}</NormalText>
  </View>
);

const NavigatorButton = ({ title, icon, ...otherProps }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    {...otherProps}
    style={styles.navigatorContainer}
  >
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.navigatorText}>{title}</Text>
  </TouchableOpacity>
);

function CustomDrawer(props) {
  const { setTokens } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const getUser = async () => {
    const data = await cache.get("user");
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const { firstname, lastname, email } = user;

  const handleSignOut = async () => {
    setTokens(null);
    authStorage.removeToken();
  };

  return (
    <DrawerContentScrollView {...props} style={{ padding: 25 }}>
      <LargeText>
        {firstname} {lastname}
      </LargeText>
      <AppText>{email}</AppText>
      <HorizontalLine marginTop={10} />
      <View style={styles.navigatorsContainer}>
        <NavigatorButton
          title="Profile"
          icon={<Profile />}
          onPress={() => props.navigation.navigate("ProfileStack")}
        />
        <NavigatorButton
          title="Preference"
          icon={<Preference />}
          // onPress={() => props.navigation.navigate("Preference")}
        />
        <NavigatorButton
          title="Wishlist"
          icon={<Wishlist />}
          onPress={() => props.navigation.navigate("Wishlist")}
        />
      </View>
      <HorizontalLine />
      <AppText style={{ marginTop: 25 }}>HELP & INFO</AppText>
      <OtherInfosComponent detail="Help Center" icon={<Help />} />
      <OtherInfosComponent detail="Terms and Conditions" icon={<Document />} />
      <OtherInfosComponent detail="Privacy Policy" icon={<Privacy />} />
      <HorizontalLine marginVertical={25} marginTop={15} />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSignOut}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <SignOut color={Colors.grey} />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 3,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  largeText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
  },
  navigatorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  navigatorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 25,
  },
  navigatorText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    color: Colors.black,
    marginTop: 7,
  },
  normalText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 17.5,
    color: Colors.black,
    marginLeft: 25,
  },
  signOutText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 19,
    color: Colors.black,
    marginLeft: 20,
  },
});

export default CustomDrawer;
