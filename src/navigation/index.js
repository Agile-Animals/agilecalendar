import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import SignUp from "../screens/SignUp";
import DayScreen from "../screens/DayScreen";
import PersonnelScreen from "../screens/PersonnelScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="PersonnelScreen"
      component={PersonnelScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="DayScreen"
      component={DayScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name={"Loading"}
      component={LoadingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Sign Up"
      component={SignUp}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export { LoginStack };
