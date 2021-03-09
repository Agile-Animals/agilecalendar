import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, ActivityIndicator, Alert, } from "react-native";
import moment from "moment";
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

  let today = new Date();
  let aday2 = moment(today).add(1, "day").format("YYYY-MM-DD");
  let aday3 = moment(today).add(2, "day").format("YYYY-MM-DD");
  let aday4 = moment(today).add(3, "day").format("YYYY-MM-DD");
  let aday5 = moment(today).add(4, "day").format("YYYY-MM-DD");
  let aday6 = moment(today).add(5, "day").format("YYYY-MM-DD");
  let aday7 = moment(today).add(6, "day").format("YYYY-MM-DD");

  const day1 = ({ item, index }) =>
    item.date === moment(today).format("YYYY-MM-DD") ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day2 = ({ item, index }) =>
    item.date === aday2 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day3 = ({ item, index }) =>
    item.date === aday3 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day4 = ({ item, index }) =>
    item.date === aday4 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day5 = ({ item, index }) =>
    item.date === aday5 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day6 = ({ item, index }) =>
    item.date === aday6 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day7 = ({ item, index }) =>
    item.date === aday7 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

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
        <Button style={{ height: 40, width: 140 }} onPress={handlePress}>
          Logga Ut
        </Button>
      </Layout>
      <Layout style={styles.listContainer}>
        <Layout style={{ width: 180 }}>
          <Text> Måndag: {moment(today).format("MM-DD")}</Text>
          <List data={insatser} renderItem={day1} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Tisdag: {moment(today).add(1, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day2} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Onsdag: {moment(today).add(2, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day3} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Torsdag: {moment(today).add(3, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day4} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Fredag: {moment(today).add(4, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day5} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Lördag: {moment(today).add(5, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day6} />
        </Layout>
        <Layout style={{ width: 180 }}>
          <Text> Söndag: {moment(today).add(6, "day").format("MM-DD")}</Text>
          <List data={insatser} renderItem={day7} />
        </Layout>
      </Layout>
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
    // width: 500,
  },
  item: {
    backgroundColor: "red",
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
    color: "red",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default HomeScreen;
