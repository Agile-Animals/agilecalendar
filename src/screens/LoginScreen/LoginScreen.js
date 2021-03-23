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

const LoginScreen = ({ navigation }) => {
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
    <ScrollView>
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

            {/* <View style={styles.loginBtn}>
        <ThemeProvider>
          <Button
            icon={<Icon name="arrow-right" size={15} color="#000000" />}
            type="outline"
            iconRight
            title="Logga in  "
            onPress={onSubmit}
          />
        </ThemeProvider>
      </View> */}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>

            <Text style={styles.inlineText}>Create account</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Sign Up")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    //flexDirection: "column",
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  // heading: {
  //   fontSize: 28,
  // },
  text: {
    textAlign: "center",
    fontSize: 60,
    margin: "5%",
    marginTop: "15%",
    fontWeight: "bold",
    color: "white",
  },
  // header: {
  //   alignItems: "center",
  //   padding: 20,
  //   paddingTop: 30,
  // },
  // logo: {
  //   fontWeight: "bold",
  //   fontSize: 70,
  //   color: "#fb5b5a",
  //   marginBottom: 40,
  // },
  // // loginForm: {
  //   //maxWidth: 300,
  //   //justifyContent: "center",
  //   alignItems: "center",
  //   width: "30%",
  //   backgroundColor: "#465881",
  //   borderRadius: 50,
  //   height: 130,
  //   marginBottom: 50,
  //   justifyContent: "center",
  //   padding: 30,
  // },
  // loginBtn: {
  //   // FontColor: '#0000',
  //   width: "80%",
  //   backgroundColor: "#fb5b5a",
  //   borderRadius: 25,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 40,
  //   marginBottom: 10,
  // },
  // formInput: {
  //   margin: 4,
  // },
  // titleText: {
  //   fontSize: ,
  //   lineHeight: 24,
  //   fontWeight: "bold",
  //   color: "white",
  // },
  // box: {
  //   height: 150,
  //   width: 150,
  //   backgroundColor: "white",
  //   borderRadius: 5,
  // },
  // TextInput: {
  //   //marginTop: 12,
  //   width: 300,
  //   fontSize: 30,
  //   borderBottomWidth: 1,
  //   height: 50,
  //   //flex: 1,
  //   //padding: 10,
  //   //marginLeft: 20,
  //   color: "white",
  // },
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
