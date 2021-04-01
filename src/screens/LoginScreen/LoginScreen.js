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
import { useForm, Controller } from "react-hook-form";
import { signIn } from "../../API/firebaseMethods";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input, Text, ThemeProvider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useWindowDimensions } from "react-native";

const LoginScreen = ({ navigation }) => {
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SunIcon = (props) => <Icon {...props} name="sun-outline" />;
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
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
      await signIn(email, password);
      setEmail("");
      setPassword("");
      navigation.navigate("Loading");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Agile Calendar</Text>

        <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="white"
            value={email}
            onChangeText={(email) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor="white"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={styles.buttonText}>Logga in</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>Create account</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text style={styles.buttonText}>Skapa konto</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
    marginTop: "50%",
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
