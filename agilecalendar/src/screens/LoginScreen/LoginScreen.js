import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Text, Layout, Button, Input, Icon } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { ThemeContext } from "../../../config/ThemeContext";

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();
  const SunIcon = (props) => <Icon {...props} name="sun-outline" />;
  const themeContext = React.useContext(ThemeContext);
  const onSubmit = (data) => {
    if (data.email === "test" && data.password === "test") {
      console.log("Succé!");
      navigation.navigate("HomeScreen");
    } else {
      alert("E-mail/Lösenord är felaktigt.");
    }
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
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.formInput}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="E-postadress"
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text>E-postadress får inte vara tomt.</Text>}
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <Input
              style={styles.formInput}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="Lösenord"
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.password && <Text>Lösenord får inte vara tomt.</Text>}
      </Layout>
      <Button style={styles.loginBtn} onPress={handleSubmit(onSubmit)}>
        Logga in
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
