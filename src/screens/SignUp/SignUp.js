import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { registration } from "../../API/firebaseMethods";
import * as Notifications from "expo-notifications";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  // function for pop out alert window if any requried information is missing
  const handlePress = async () => {
    if (!firstName) {
      Alert.alert("Namn måste fyllas i.");
    } else if (!email) {
      Alert.alert("E-mail måste fyllas i.");
    } else if (!password) {
      Alert.alert("Lösenord måste fyllas i.");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Lösenord måste bekräftas.");
    } else if (password !== confirmPassword) {
      Alert.alert("Lösenorden är inte samma.");
    } else {
      const pushToken = await Notifications.getExpoPushTokenAsync();
      registration(email, password, lastName, firstName, pushToken.data);
      navigation.navigate("Loading");
      emptyState();
    }
  };
  // return for adding user with detailed information
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.text}>Skapa ny konto Här!  </Text>

          <ScrollView onBlur={Keyboard.dismiss}>
            <TextInput
              style={styles.textInput}
              placeholder="Namn"
              placeholderTextColor="white"
              value={firstName}
              onChangeText={(name) => setFirstName(name)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Efternam"
              placeholderTextColor="white"
              value={lastName}
              onChangeText={(name) => setLastName(name)}
            />

            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
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
            <TextInput
              style={styles.textInput}
              placeholder="Skriv in samma lösenord igen"
              placeholderTextColor="white"
              value={confirmPassword}
              onChangeText={(password2) => setConfirmPassword(password2)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Skapa konto</Text>
            </TouchableOpacity>

            <Text style={styles.inlineText}>Har du redan ett konto?</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
// styling here
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: "#483d8b",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    margin: "5%",
  },
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
    marginTop: "5%",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    margin: "5%",
    marginTop: "15%",
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    width: 300,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 5,
  },
});
