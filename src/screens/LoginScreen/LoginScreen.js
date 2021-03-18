import React, { useState } from "react";
import { View, StyleSheet, Alert, SafeAreaView, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "../../API/firebaseMethods";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input, Text, ThemeProvider } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SunIcon = (props) => <Icon {...props} name="sun-outline" />;
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const onSubmit = () => {
    if (!password && !email) {
      Alert.alert("E-postadress och Lösenord saknas.");
    } else if (!email) {
      Alert.alert("E-postadress saknas.");
    } else if (!password) {
      Alert.alert("Lösenord saknas.");
    } else {
      if (signIn(email, password)) {
        setEmail("");
        setPassword("");
        navigation.navigate("Loading");
      }
    }
    setEmail("");
    setPassword("");
  };
  // const onSubmit = () => {
  //   if (!email) {
  //     Alert.alert("Email field is required.");
  //   }

  //   if (!password) {
  //     Alert.alert("Password field is required.");
  //   }

  //   signIn(email, password);
  //   setEmail("");
  //   setPassword("");
  //   navigation.navigate("Loading");
  // };

  return (
    <View style={styles.container}>
      <View level="1">
        <Text style={styles.logo}>Agile Calendar</Text>
      </View>

      <View style={styles.loginForm} level="1">
        <SafeAreaView>
          <TextInput
            style={styles.TextInput}
            onChangeText={(email) => setEmail(email)}
            //autoCapitalize="none"
            value={email}
            keyboardType="email-address"
            placeholder="E-postadress"
            placeholderTextColor="#003f5c"
            // keyboardType="numeric"
          />
        </SafeAreaView>

        <SafeAreaView>
          <TextInput
            style={styles.TextInput}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            value={password}
            placeholder="Lösenord"
            placeholderTextColor="#003f5c"
            // keyboardType="numeric"
          />
        </SafeAreaView>
      </View>
      <View style={styles.loginBtn}>
        <ThemeProvider>
          <Button
            icon={<Icon name="arrow-right" size={15} color="#000000" />}
            type="outline"
            iconRight
            title="Logga in  "
            onPress={onSubmit}
          />
        </ThemeProvider>
      </View>
      <View style={styles.loginBtn}>
        <ThemeProvider>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            iconRight
            title="Sign Up  "
            color="red"
            onPress={() => navigation.navigate("Sign Up")}
          />
        </ThemeProvider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
  heading: {
    fontSize: 28,
  },
  text: {
    margin: 2,
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 70,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  loginForm: {
    //maxWidth: 300,
    //justifyContent: "center",
    alignItems: "center",
    width: "30%",
    backgroundColor: "#465881",
    borderRadius: 50,
    height: 130,
    marginBottom: 50,
    justifyContent: "center",
    padding: 30,
  },
  loginBtn: {
    // FontColor: '#0000',
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  formInput: {
    margin: 4,
  },
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
  TextInput: {
    //marginTop: 12,
    width: 300,
    fontSize: 30,
    borderBottomWidth: 1,
    height: 50,
    //flex: 1,
    //padding: 10,
    //marginLeft: 20,
    color: "white",
  },
});

export default LoginScreen;
