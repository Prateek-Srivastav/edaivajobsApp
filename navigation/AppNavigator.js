import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Colors from "../constants/Colors";
import ProfileNavigator from "./ProfileNavigator";
import TabNavigator from "./TabNavigator";
import WishlistScreen from "../screens/WishlistScreen";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="ProfileStack" component={ProfileNavigator} />
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: true,
          headerLeft: () => null,
          headerTitleStyle: {
            fontFamily: "OpenSans-SemiBold",
            color: Colors.primary,
            fontSize: 20,
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
