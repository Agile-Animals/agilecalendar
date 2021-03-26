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
  FlatList,
  ListItem,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import moment from "moment-with-locales-es6";
// import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";
import Draggable from "../../components/Draggable";
import { Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

export default class HomeScreen extends Component {
  constructor(props) {
    var localLocale = moment();
    localLocale.locale("sv");
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("insatser")
      .where("boende", "==", firebase.auth().currentUser.uid);
    this.state = {
      isLoading: true,
      insatser: [],
      dragging: false,
      dropzones: [],
      dropzoneLayouts: [],

    };
    this.state1 = {
      tableHead: [
        "The Time",
        <Text>{localLocale.add(0, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
        <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text>,
      ],
    }
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

  render() {
    const { insatser, dragging } = this.state;
    const state = this.state1;
    var localLocale = moment();
    localLocale.locale("sv");
    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    var aday2 = moment(today).add(1, "day").format("YYYY-MM-DD");
    var aday3 = moment(today).add(2, "day").format("YYYY-MM-DD");
    var aday4 = moment(today).add(3, "day").format("YYYY-MM-DD");
    var aday5 = moment(today).add(4, "day").format("YYYY-MM-DD");
    var aday6 = moment(today).add(5, "day").format("YYYY-MM-DD");
    var aday7 = moment(today).add(6, "day").format("YYYY-MM-DD");

    var timeData = [
      [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
    ];
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
            Översikt
          </Text>
        </View>
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

        <ScrollView>
            <View
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
          <View style={styles.listContainer}>
            {/* _____________________ */}

            <View style={{ width: 140 }}>
              {/* <Text>The Time</Text> */}
              {/* <ScrollView> */}
              <Text style={styles.instatsList}>8:00</Text>
              <Text style={styles.instatsList}>9:00</Text>
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
              {/* </ScrollView> */}
            </View>

            {/* ____________ */}

            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(0, "day").format("dddd MM-DD")}</Text> */}

              {insatser.map((item, index) => {
                return item.date == today ? (
                  <Pressable
                    style={styles.instatsList}
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
              {/* <FlatList
              scrollEnabled={!dragging}
              data={insatser}
              renderItem={({ item, index }) =>
                item.date == today ? (
                  <Pressable
                    style={styles.instatsList}
                    onPress={() => {
                      this.props.navigation.navigate("InsatsDetailScreen", {
                        insatskey: item.key,
                      });
                    }}
                  >
                    <Text>{item.insatsType}</Text>
                  </Pressable>
                ) : null
              }
            /> */}
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday2 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday3 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday4 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday5 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday6 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
            <View style={{ width: 140 }}>
              {/* <Text>{localLocale.add(1, "day").format("dddd MM-DD")}</Text> */}
              <FlatList
                scrollEnabled={!dragging}
                data={insatser}
                renderItem={({ item, index }) =>
                  item.date === aday7 ? (
                    <Pressable
                      style={styles.instatsList}
                      onPress={() => {
                        this.props.navigation.navigate("InsatsDetailScreen", {
                          insatskey: item.key,
                        });
                      }}
                    >
                      <Text>{item.insatsType}</Text>
                    </Pressable>
                  ) : null
                }
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonI}>
          <View style={{ width: 120, backgroundColor: "white" }}>
            <Button
              title="Lägg till insats"
              icon={<Icon name="plus" size={15} color="white" />}
              iconRight
              style={{ height: 40, width: 140 }}
              onPress={() => {
                this.props.navigation.navigate("AddInsatsScreen");
              }}
              type="outline"
            />
          </View>
        </View>
        <View style={styles.button}>
          <View style={{ width: 120, backgroundColor: "white" }}>
            <Button
              title="Logga Ut"
              onPress={() => this.logOut()}
              type="outline"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // width: window.width * 1,
    // height: window.width * 1,
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
    marginTop: 10,
    // margin: 10,

    borderRadius: 10,
    borderColor: "black",
    // shadowColor: "black",
    shadowColor: "red",
    paddingLeft: 140,
    // width: 500,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  instatsList: {
    paddingTop: 10,
    paddingBottom: 10,
    flex: 10,
    paddingLeft: 7,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ccc",
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
    //backgroundColor: "#483d8b",
    //   borderWidth: 2,
    //   borderColor: "white",
    //   borderRadius: 20,
    //   color: "red",
  },
  buttonI: {
    padding: 0,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 }
});
