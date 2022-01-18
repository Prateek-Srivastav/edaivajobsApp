import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import JobDetailScreen from "../screens/JobDetailScreen";

import Colors from "../constants/Colors";

const Stack = createNativeStackNavigator();

const leftHeader = () => {
  const navigation = useNavigation();
  let isBackShown = true;
  // if (
  //   navigation.getRootState() === undefined ||
  //   navigation.getRootState().routes.length === 1
  // )
  //   isBackShown = false;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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

const rightLoginHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ marginRight: 5 }}>
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
        //   headerShadowVisible: false,
        headerShown: false,
        // headerStyle: { backgroundColor: "#FDFDFD" },
        // headerRight: () => rightLoginHeader(),
      }}
    />
    <Stack.Screen
      name="JobDetail"
      component={JobDetailScreen}
      options={{
        headerRight: () => rightLoginHeader(),
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

export default JobsNavigator;
