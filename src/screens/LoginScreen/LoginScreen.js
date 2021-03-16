import React, { useState } from "react";
import { View, StyleSheet, Alert, SafeAreaView, TextInput,  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ThemeContext } from "../../../config/ThemeContext";
import { signIn } from "../../API/firebaseMethods";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, Text } from 'react-native-elements';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SunIcon = (props) => <Icon {...props} name="sun-outline" />;
  const themeContext = React.useContext(ThemeContext);
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
        <Text style={{ fontSize: 45, marginTop: 52 }} >Agile Calendar</Text>
      </View>

      <View style={styles.loginForm} level="1">
        <View level="1">
          <Text style={{ fontSize: 35, marginTop: 12, color: '#0080FF' }} >Logga in</Text>
        </View>
        <SafeAreaView>
          <TextInput
            style={{
              marginTop: 12,
              width: 300,
              fontSize: 25,
              borderBottomWidth: 1,
            }}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            value={email}
            keyboardType="email-address"
            placeholder="E-postadress"
          // keyboardType="numeric"
          />
        </SafeAreaView>

        <SafeAreaView>
          <TextInput
            style={{
              marginTop: 12,
              width: 300,
              fontSize: 25,
              borderBottomWidth: 1,
            }}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            value={password}
            placeholder="Lösenord"
          // keyboardType="numeric"
          />
        </SafeAreaView>

      </View>
      <View style={{
        marginTop: 12,
        width: 300,
      }}>
        <Button
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="#0080FF"
            />
          }
          type="outline"
          iconRight
          title="Logga in  " onPress={onSubmit}

        />
      </View>
      <View style={{
        marginTop: 12,
        width: 300,
      }}>
        <Button
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
            />
          }
          iconRight
          title="Sign Up  "
          onPress={() => navigation.navigate("Sign Up")}

        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
  loginForm: {
    maxWidth: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    // FontColor: '#0000',
    marginTop: 12,
    width: 300,
  },
  formInput: {
    margin: 4,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default LoginScreen;
