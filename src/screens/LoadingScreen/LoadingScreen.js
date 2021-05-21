import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as firebase from "firebase";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.uid === "29iAmOUm7OPnDZMSpQtGJ6P2Get1") {
          navigation.replace("PersonnelScreen");
        } else {
          navigation.replace("HomeScreen");
        }
      } else {
        navigation.replace("Login");
      }
    });
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
