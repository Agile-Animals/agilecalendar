import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddUserScreen from '../screens/AddUserScreen';
import UserScreen from '../screens/UserScreen';
import UserDetailScreen from '../screens/UserDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Översikt") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Översikt" component={HomeScreen} />
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
      name="Home"
      component={LoggedInTabs}
      options={{
        header: () => null,
      }}
    />
    <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      />
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Users List' }}
      />
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
  </Stack.Navigator>
);

export { LoginStack, LoggedInTabs };
