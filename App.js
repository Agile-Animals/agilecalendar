import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as eva from "@eva-design/eva";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { LoginStack } from "./src/navigation";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "./config/custom-theme.json";
import { ThemeContext } from "./config/ThemeContext";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const App = () => {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <LoginStack />
              <Text>{`Window Dimensions: height - ${dimensions.window.height},
               width - ${dimensions.window.width}`}</Text>
              <Text>{`Screen Dimensions: height - ${dimensions.screen.height},
               width - ${dimensions.screen.width}`}</Text>
            </NavigationContainer>
          </SafeAreaView>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
