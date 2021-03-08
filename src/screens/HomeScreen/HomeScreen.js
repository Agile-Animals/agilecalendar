import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ActivityIndicator, Alert } from "react-native";
import {
  Icon,
  Layout,
  Text,
  Button,
  List,
  Card,
  Calendar,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";

// these need to be updated upon fliping or they serve no real purpose
// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [insatser, setInsatser] = useState([]); // Initial empty array of users
  const [date, setDate] = useState(new Date());

  const insatsRef = firebase.firestore().collection("insatser");
  const userID = firebase.auth().currentUser.uid;

  useEffect(() => {
    const subscriber = insatsRef
      .where("boende", "==", userID)
      .onSnapshot((querySnapshot) => {
        const tempInsatser = [];

        querySnapshot.forEach((documentSnapshot) => {
          tempInsatser.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setInsatser(tempInsatser);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const handlePress = () => {
    loggingOut();
    navigation.replace("Login");
  };

  const renderItem = ({ item, index }) => (
    <Card
      style={styles.instatsList}
      onPress={() => {
        navigation.navigate("InsatsDetailScreen", {
          insatskey: item.key
        });
      }}
    >
      <Text>{item.fromTime}-{item.toTime} {"\n\n"}
        {item.insatsType} </Text>
    </Card>
  );

  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt user: {userID}</Text>
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
      </Layout>
      <Layout style={styles.listContainer}>
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
        <List
          data={insatser}
          renderItem={renderItem}
        />
      </Layout>
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

      <Button
        style={{ height: 40, width: 140 }}
        onPress={ handlePress }>
        Logga Ut
      </Button>
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
  listContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: "black",
    shadowColor: "black",
    shadowColor: "red",
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
  instatsList: {
    height: 100,
    flex: 10,
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default HomeScreen;
