import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  View,
  Animated,
  Pressable,
  ImageBackground,
  ListItem,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  PanResponder,
} from "react-native";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";
import Draggable from "../../components/Draggable";
import { Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("insatser")
      .where("boende", "==", firebase.auth().currentUser.uid);
    this.state = {
      isLoading: true,
      insatser: [],
      dragging: false,
      tmpDays: [
        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
        "Söndag",
      ],
      dayChecker: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      days: ["", "", "", "", "", "", ""],
      pan: new Animated.ValueXY(),
    };
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.dragging = true;
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        this.state.dragging = false;
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    });
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const insatser = [];
    querySnapshot.forEach((res) => {
      const {
        boende,
        fromTime,
        toTime,
        date,
        helperName,
        insatsType,
        freeText,
      } = res.data();
      insatser.push({
        key: res.id,
        boende,
        fromTime,
        toTime,
        date,
        helperName,
        insatsType,
        freeText,
      });
    });
    this.setState({
      insatser,
      isLoading: false,
    });
  };

  logOut() {
    loggingOut();
    this.props.navigation.replace("Login");
  }

  dynamicDays() {
    for (let i = 0; i < 7; ++i) {
      if (moment(this.state.today).format("ddd") === this.state.dayChecker[i]) {
        var week = moment().startOf("isoWeek");
        for (let a = 0; a < 7; ++a) {
          if ((i + a) % 7 == i) {
            this.state.days[(i + a) % 7] = "Idag";
          } else {
            this.state.days[(i + a) % 7] = this.state.tmpDays[(i + a) % 7];
          }
          this.state.days[(i + a) % 7] +=
            " " + moment(this.state.today).add(a, "day").format("MM-DD");
        }
        i = 9;
      }
    }
  }

  render() {
    const { insatser, dragging, days } = this.state;
    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    var aday2 = moment(today).add(1, "day").format("YYYY-MM-DD");
    var aday3 = moment(today).add(2, "day").format("YYYY-MM-DD");
    var aday4 = moment(today).add(3, "day").format("YYYY-MM-DD");
    var aday5 = moment(today).add(4, "day").format("YYYY-MM-DD");
    var aday6 = moment(today).add(5, "day").format("YYYY-MM-DD");
    var aday7 = moment(today).add(6, "day").format("YYYY-MM-DD");
    this.dynamicDays();
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text category="h2" style={{ fontSize: 20 }}>
            Veckovy
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 100,
          }}
        >
          <ImageBackground
            source={require("../../../assets/moln.png")}
            style={styles.moln}
          >
            <Draggable message={"Handla"} />
            <View style={{ padding: 3 }}>
              <Draggable message={"Städa"} />
              <Draggable message={"Duscha"} />
              <Draggable message={"Fritext"} />
            </View>
            <View>
              <Draggable message={"Tvätta "} />
            </View>
          </ImageBackground>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "black" }}>
              <Button
                title="Logga Ut"
                onPress={() => this.logOut()}
                type="outline"
              />
            </View>
          </View>
        </View>
        <View style={styles.head}>
          <Text style={styles.headItems}></Text>
          <Text style={styles.headItems}>{this.state.days[0]}</Text>
          <Text style={styles.headItems}>{this.state.days[1]}</Text>
          <Text style={styles.headItems}>{this.state.days[2]}</Text>
          <Text style={styles.headItems}>{this.state.days[3]}</Text>
          <Text style={styles.headItems}>{this.state.days[4]}</Text>
          <Text style={styles.headItems}>{this.state.days[5]}</Text>
          <Text style={styles.headItems}>{this.state.days[6]}</Text>
        </View>
        <ScrollView scrollEnabled={!dragging}>
          <View style={styles.listContainer}>
            <View style={{ width: 140 }}>
              <Text style={styles.instatsList}>06:00 </Text>
              <Text style={styles.instatsList}>07:00 </Text>
              <Text style={styles.instatsList}>08:00</Text>
              <Text style={styles.instatsList}>09:00</Text>
              <Text style={styles.instatsList}>10:00</Text>
              <Text style={styles.instatsList}>11:00</Text>
              <Text style={styles.instatsList}>12:00</Text>
              <Text style={styles.instatsList}>13:00</Text>
              <Text style={styles.instatsList}>14:00</Text>
              <Text style={styles.instatsList}>15:00</Text>
              <Text style={styles.instatsList}>16:00</Text>
              <Text style={styles.instatsList}>17:00</Text>
              <Text style={styles.instatsList}>18:00</Text>
              <Text style={styles.instatsList}>19:00 </Text>
              <Text style={styles.instatsList}>20:00 </Text>
              <Text style={styles.instatsList}>21:00 </Text>
              <Text style={styles.instatsList}>22:00 </Text>
              <Text style={styles.instatsList}>23:00 </Text>
              <Text style={styles.instatsList}>24:00 </Text>
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date == today ? (
                  <Animated.View
                    style={{
                      transform: [
                        { translateX: this.state.pan.x },
                        { translateY: this.state.pan.y },
                      ],
                    }}
                    {...this.panResponder.panHandlers}
                  >
                    <Pressable
                      style={styles.item}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  </Animated.View>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday2 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday3 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday4 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday5 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday6 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.insatser.map((item, index) => {
                return item.date === aday7 ? (
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null;
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#00ced1",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  listContainer: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    shadowColor: "red",
  },
  item: {
    height: 43.5,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  instatsList: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ccc",
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  moln: {
    flexDirection: "row",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 220,
  },
  button: {
    height: 40,
    width: 140,
    alignSelf: "flex-end",
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    flexDirection: "row",
    marginTop: 5,
  },
  headItems: {
    width: 140,
    alignSelf: "center",
  },
  text: {
    margin: 6,
  },
});
