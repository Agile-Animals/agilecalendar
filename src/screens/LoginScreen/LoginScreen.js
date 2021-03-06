import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Layout, Button, Input, Icon } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { ThemeContext } from "../../../config/ThemeContext";
import { signIn } from "../../API/firebaseMethods";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SunIcon = (props) => <Icon {...props} name="sun-outline" />;
  const themeContext = React.useContext(ThemeContext);

  const onSubmit = () => {
    if (!email) {
      Alert.alert("Email field is required.");
    }

    if (!password) {
      Alert.alert("Password field is required.");
    }

    signIn(email, password);
    setEmail("");
    setPassword("");
    navigation.navigate("Loading");
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.header} level="1">
        <Text category="h1">Agile Calendar</Text>
      </Layout>

      <Layout style={styles.loginForm} level="1">
        <Layout style={styles.header} level="1">
          <Text category="h2">Logga in</Text>
        </Layout>
        <Input
          style={styles.formInput}
          autoCapitalize="none"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          placeholder="E-postadress"
        />
        <Input
          style={styles.formInput}
          autoCapitalize="none"
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Lösenord"
        />
      </Layout>
      <Button style={styles.loginBtn} onPress={onSubmit}>
        Logga in
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <Layout
        style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
      >
        <Button
          style={{ height: 1, width: 1 }}
          accessoryLeft={SunIcon}
          onPress={themeContext.toggleTheme}
        ></Button>
      </Layout>
    </Layout>
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
    marginTop: 12,
    width: 300,
  },
  formInput: {
    margin: 4,
  },
});

export default LoginScreen;
