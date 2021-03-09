import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert, PanResponder, Animated } from "react-native";
import { Text, Button, Input, Icon } from "@ui-kitten/components";
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

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.header} level="1">
        <Text category="h1">Agile Calendar</Text>
      </View>

      <View style={styles.loginForm} level="1">
        <View style={styles.header} level="1">
          <Text category="h2">Logga in</Text>
        </View>
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
      </View>
      <Button style={styles.loginBtn} onPress={onSubmit}>
        Logga in
      </Button>
      <Button
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Button>
      <View style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}>
        <Button
          style={{ height: 1, width: 1 }}
          accessoryLeft={SunIcon}
          onPress={themeContext.toggleTheme}
        ></Button>
      </View>
      <View style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <View style={styles.box}>
          <Text style={styles.titleText}>Drag this box!</Text></View>
        </Animated.View>
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
