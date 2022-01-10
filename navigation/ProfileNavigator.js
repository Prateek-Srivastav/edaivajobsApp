import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import JobDetailScreen from "../screens/JobDetailScreen";

import Colors from "../constants/Colors";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

const leftHeader = () => {
  const navigation = useNavigation();
  let isBackShown = true;
  if (
    navigation.getRootState() === undefined ||
    navigation.getRootState().routes.length === 1
  )
    isBackShown = false;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
    >
      {isBackShown && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const rightMenuHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ marginRight: 5 }}>
      <MaterialCommunityIcons
        name="dots-vertical"
        size={24}
        color={Colors.primary}
      />
    </TouchableOpacity>
  );
};

// const rightRegisterHeader = () => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//       <Text
//         style={{
//           fontFamily: "OpenSans-Medium",
//           fontSize: 16,
//           color: Colors.primary,
//         }}
//       >
//         Login
//       </Text>
//     </TouchableOpacity>
//   );
// };

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerLeft: () => leftHeader(),
      headerBackVisible: false,
      // headerTitle: () => null,
      // ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        //   headerShadowVisible: false,
        // headerShown: false,
        // headerStyle: { backgroundColor: "#FDFDFD" },
        // headerRight: () => rightshareHeader(),
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              color: Colors.primary,
              fontSize: 20,
            }}
          >
            Profile
          </Text>
        ),
        headerRight: rightMenuHeader,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        // headerRight: () => rightshareHeader(),
        headerTitle: () => (
          <Text
            style={{
              fontFamily: "OpenSans-SemiBold",
              color: Colors.primary,
              fontSize: 20,
            }}
          >
            Edit Profile
          </Text>
        ),
      }}
    />
    {/* <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{
        headerRight: () => rightRegisterHeader(),
        
      }}
    /> */}
  </Stack.Navigator>
);

export default ProfileNavigator;
