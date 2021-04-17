import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack } from "./src/navigation";
import firebase from "./src/database/firebaseDb";
import { useWindowDimensions } from "react-native";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

const App = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <LoginStack />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
