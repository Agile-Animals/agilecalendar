import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  View,
  PanResponder,
  Animated,
  Pressable,
  ImageBackground,
  FlatList,
} from "react-native";
import moment from "moment";
import { Icon, Text, Button, Calendar } from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";

// these need to be updated upon fliping or they serve no real purpose
// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
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
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
        }).start();
      },
    })
  ).current;

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
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day2 = ({ item, index }) =>
    item.date === aday2 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day3 = ({ item, index }) =>
    item.date === aday3 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day4 = ({ item, index }) =>
    item.date === aday4 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day5 = ({ item, index }) =>
    item.date === aday5 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day6 = ({ item, index }) =>
    item.date === aday6 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  const day7 = ({ item, index }) =>
    item.date === aday7 ? (
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Pressable
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
        </Pressable>
      </Animated.View>
    ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text category="h2">Översikt user: {userID}</Text>
      </View>
      <ImageBackground
            source={require("../../../assets/moln.png")}
            style={styles.moln}
          >
            <View>
              <Animated.View
                style={{
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
                {...panResponder.panHandlers}
              >
                <View style={styles.box}>
                  <Text style={styles.titleText}>Städa</Text>
                </View>
              </Animated.View>
            </View>
          </ImageBackground>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

        {/* <Button
          style={{ height: 40, width: 140 }}
          onPress={() => {
            navigation.navigate("AddInsatsScreen");
          }}
        >
          Lägg till insats
        </Button> */}
        
      </View>
      <View style={styles.listContainer}>
        <View style={{ width: 140 }}>
          <Text> Idag {moment(today).format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day1} />
        </View>
        <View style={{ width: 140 }}>
          <Text> {moment(today).add(1, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day2} />
        </View>
        <View style={{ width: 140 }}>
          <Text> {moment(today).add(2, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day3} />
        </View>
        <View style={{ width: 140 }}>
          <Text> T{moment(today).add(3, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day4} />
        </View>
        <View style={{ width: 140 }}>
          <Text> {moment(today).add(4, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day5} />
        </View>
        <View style={{ width: 140 }}>
          <Text> {moment(today).add(5, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day6} />
        </View>
        <View style={{ width: 140 }}>
          <Text> {moment(today).add(6, "day").format("MM-DD")}</Text>
          <FlatList data={insatser} renderItem={day7} />
        </View>
      </View>
      <Button style={{ height: 40, width: 140 }} onPress={handlePress}>
          Logga Ut
        </Button>
    </View>
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
    paddingLeft: 280,
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
    borderColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 40,
    width: 100,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  moln: {
    // flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 100,
    width: 220,
  },
});

export default HomeScreen;
