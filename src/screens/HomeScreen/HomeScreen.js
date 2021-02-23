import * as React from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import { ScreenOrientation } from 'expo';

const data = [
  {
    id: "test 1",
    kund: "Arne",
    tid: "Måndag-10:15",
    title: "Insats 1",
    typ: "Städa",
  },
  {
    id: "test 2",
    kund: "Kerstin",
    tid: "Tisdag-11:15",
    title: "Insats 2",
    typ: "Handla",
  },
  {
    id: "test 3",
    kund: "Bengt",
    tid: "Fredag-15:15",
    title: "Insats 3",
    typ: "Städa",
  },
  {
    id: "test 4",
    kund: "Ove",
    tid: "Onsdag-09:15",
    title: "Insats 4",
    typ: "Duscha",
  },
];

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const HomeScreen = () => {
  const renderItemAccessory = (props) => (
    <Button size="tiny">
      Remove
    </Button>
  );

  const renderItemIcon = (props, { item }) => <Icon {...props} name="shopping-cart" />;
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      description={`${item.kund}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt</Text>
      </Layout>
      <Button style={{ width: 140 }} >
        Lägg till insats
      </Button>
      <List style={styles.container} data={data} renderItem={renderItem} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: window.width * 1,
    height: window.width * 1,
    // alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;
