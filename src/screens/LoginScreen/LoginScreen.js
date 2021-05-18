import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { signIn } from "../../API/firebaseMethods";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useWindowDimensions } from "react-native";
import * as Notifications from "expo-notifications";

// function for user login
const LoginScreen = ({ navigation }) => {
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function for pop out alert window if any requried information is missing
  const onSubmit = async () => {
    if (!password && !email) {
      Alert.alert("E-postadress och Lösenord saknas.");
      setEmail("");
      setPassword("");
    } else if (!email) {
      Alert.alert("E-postadress saknas.");
      setEmail("");
      setPassword("");
    } else if (!password) {
      Alert.alert("Lösenord saknas.");
      setEmail("");
      setPassword("");
    } else {
      const pushToken = await Notifications.getExpoPushTokenAsync();
      let loginTest = await signIn(email, password, pushToken.data);
      setEmail("");
      setPassword("");
      if (loginTest === 0) navigation.navigate("Loading");
    }
  };
  // return for input user email and password to be able to login
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>Agile Calendar</Text>

          <ScrollView onBlur={Keyboard.dismiss}>
            <TextInput
              style={styles.textInput}
              placeholder="E-post"
              placeholderTextColor="white"
              value={email}
              onChangeText={(email) => setEmail(email)}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.textInput}
              placeholder="Lösenord"
              placeholderTextColor="white"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>

            <Text style={styles.inlineText}>Skapa konto</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Sign Up")}
            >
              <Text style={styles.buttonText}>Skapa konto</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
//styling here
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(49, 118, 197, 1.0)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 60,
    margin: "3%",
    marginTop: "5%",
    fontWeight: "bold",
    color: "white",
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: "#483d8b",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    margin: "5%",
  },
  // button text is for pressable buttons
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  inlineText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 20,
  },
});

export default LoginScreen;
