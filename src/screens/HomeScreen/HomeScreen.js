import * as React from "react";
import { StyleSheet, FlatList } from "react-native";
import { Calendar, Layout, Text, Button } from "@ui-kitten/components";

const DATA = [
  {
    id: "test 1",
    kund: "Arne",
    tid: "Måndag-10:15",
    title: "Insats 1",
  },
  {
    id: "test 2",
    kund: "Kerstin",
    tid: "Måndag-10:15",
    title: "Insats 2",
  },
  {
    id: "test 3",
    kund: "Bengt",
    tid: "Måndag-10:15",
    title: "Insats 3",
  },
  {
    id: "test 4",
    kund: "Ove",
    tid: "Måndag-10:15",
    title: "Insats 4",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen = () => {
  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
  );

  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt</Text>
      </Layout>
      <FlatList>
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      </FlatList>
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
