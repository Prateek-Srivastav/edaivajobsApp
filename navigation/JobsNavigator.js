import React from "react";
import { View, Image, Share, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import JobDetailScreen from "../screens/JobDetailScreen";

import Colors from "../constants/Colors";
import { jobClient } from "../api/client";

const Stack = createNativeStackNavigator();

const leftHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {navigation.canGoBack() && (
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

const rightShareHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const jobId = navigation.getState().routes[1].state.routes[1].params.jobId;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${jobClient.getBaseURL()}/jobs/detail/${jobId}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity style={{ marginRight: 5 }} onPress={onShare}>
      <AntDesign name="sharealt" size={23} color={Colors.primary} />
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

const JobsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerLeft: () => leftHeader(),
      headerTitle: () => null,
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShadowVisible: false,
        headerShown: false,
        // headerStyle: { backgroundColor: "#FDFDFD" },
        // headerRight: () => rightLoginHeader(),
      }}
    />
    <Stack.Screen
      name="JobDetail"
      component={JobDetailScreen}
      options={{
        headerRight: () => rightShareHeader(),
      }}
    />
  </Stack.Navigator>
);

export default JobsNavigator;
