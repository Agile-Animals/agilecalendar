import * as React from "react";
import { StyleSheet } from "react-native";
import { Calendar, Layout, Text } from "@ui-kitten/components";

const HomeScreen = () => {
  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt</Text>
      </Layout>
      <Calendar></Calendar>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
});

export default HomeScreen;
