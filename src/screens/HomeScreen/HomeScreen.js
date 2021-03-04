import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ActivityIndicator, Modal } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  List,
  ListItem,
  Calendar,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";

// these need to be updated upon fliping or they serve no real purpose
// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [insatser, setInsatser] = useState([]); // Initial empty array of users
  const [date, setDate] = useState(new Date());
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("insatser")
      .onSnapshot((querySnapshot) => {
        const insatser = [];

        querySnapshot.forEach((documentSnapshot) => {
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

  const renderItemIcon = (props, { item }) => (
    <Icon {...props} name="shopping-cart" />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.residentName}`}
      description={`${item.insatsType + " " + item.date}`}
      onPress={() => {
        navigation.navigate("InsatsDetailScreen", {
          insatskey: item.key,
        });
      }}
    />
  );

  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt</Text>
        {/* <Text category="h6">Valt Datum: {date.toLocaleDateString()}</Text> */}
      </Layout>
      <Layout style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          style={{ height: 40, width: 140 }}
          onPress={() => {
            navigation.navigate("AddInsatsScreen");
          }}
        >
          Lägg till insats
        </Button>
        {/* <Button
          style={{
            height: 40,
            width: 84,
          }}
          onPress={() => {
            setModalState(true);
          }}
        >
          Datum
        </Button> */}
      </Layout>
      <List style={styles.container} data={insatser} renderItem={renderItem} />
      {/* behöver byta namn på variablen ifall detta ska användas */}
      {/* <Layout style={{ flex: 1 }}>
        <Modal visible={modalState} animationType="slide">
          <Calendar
            date={date}
            onSelect={(nextDate) => {
              setDate(nextDate);
              setModalState(false);
            }}
          />
        </Modal>
      </Layout> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // width: window.width * 1,
    // height: window.width * 1,
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
