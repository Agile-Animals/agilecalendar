import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddInsatsScreen from "../screens/AddInsatsScreen";
import InsatsDetailScreen from "../screens/InsatsDetailScreen";
import LoadingScreen from "../screens/LoadingScreen";
import Dashboard from "../screens/Dashboard";
import SignUp from "../screens/SignUp";
import DayScreen from "../screens/DayScreen";
import PersonnelScreen from "../screens/PersonnelScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

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
      component={LoggedInTabs}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen
      name="AddInsatsScreen"
      component={AddInsatsScreen}
      options={{ title: "Lägg till Insats" }}
    />
    <Stack.Screen
      name="InsatsDetailScreen"
      component={InsatsDetailScreen}
      options={{ title: "Ändra Insats" }}
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
    <Stack.Screen
      name={"Dashboard"}
      component={Dashboard}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export { LoginStack, LoggedInTabs };
