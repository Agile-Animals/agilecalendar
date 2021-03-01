import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddUserScreen from '../screens/AddInsatsScreen';
import UserScreen from '../screens/InsatsScreen';
import UserDetailScreen from '../screens/InsatsDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
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
      name="HomeScreen"
      component={LoggedInTabs}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen 
        name="AddInsatsScreen" 
        component={AddInsatsScreen} 
        options={{ title: 'Add Insats' }}
      />
      <Stack.Screen 
        name="InsatsScreen" 
        component={InsatsScreen} 
        options={{ title: 'Översikt' }}
      />
      <Stack.Screen 
       name="InsatsDetailScreen" 
       component={InsatsDetailScreen} 
       options={{ title: 'Insats Detail' }}
      />
  </Stack.Navigator>
);

export { LoginStack, LoggedInTabs };
