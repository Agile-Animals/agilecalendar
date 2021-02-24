import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const renderItemAccessory = (props) => (
    <Button size="tiny">
      Remove
    </Button>
  );

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [insatser, setInsatser] = useState([]); // Initial empty array of users

  useEffect(() => {
    const subscriber = firebase.firestore()
      .collection('insatser')
      .onSnapshot(querySnapshot => {
        const insatser = [];
  
        querySnapshot.forEach(documentSnapshot => {
          insatser.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setInsatser(insatser);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const renderItemIcon = (props, { item }) => <Icon {...props} name="shopping-cart" />;
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.residentName}`}
      description={`${item.insatsType}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => {
        navigation.navigate("UserDetailScreen", {
          userkey: item.index
        });
      }}
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
      <List style={styles.container} data={insatser} renderItem={renderItem} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: window.width * 1,
    height: window.width * 1,
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
