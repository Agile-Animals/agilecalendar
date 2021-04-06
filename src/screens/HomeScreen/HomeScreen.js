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
  useWindowDimensions,
  ScrollView,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";
import Draggable from "../../components/Draggable";
import Insats from "../../components/Insats";
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
      times: [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
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
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ],
      insatsTypes: [
        "Städa",
        "Tvätta",
        "Matlagning",
        "Handla",
        "Personalbesök",
        "Aktivitet",
        "Dusch",
        "Fritext A",
        "Fritext B",
        "Fritext C",
      ],
      today: moment().format("YYYY-MM-DD"),
      currentWeek: moment().startOf("isoWeek").format("YYYY-MM-DD"),
      weekStart: moment().startOf("isoWeek").format("YYYY-MM-DD"),
      weekEnd: moment().endOf("isoWeek").format("YYYY-MM-DD"),
      scrollOfsetY: "",
    };
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
        var week = moment(this.state.weekStart).startOf("isoWeek");
        for (let a = 0; a < 7; ++a) {
          let dayIndex = (i + a) % 7;
          if (
            dayIndex == i &&
            week.toString() == moment().startOf("isoWeek").toString()
          ) {
            this.state.days[dayIndex] = "Idag";
          } else {
            this.state.days[dayIndex] = this.state.tmpDays[dayIndex];
          }
          this.state.days[dayIndex] +=
            " " +
            moment(this.state.weekStart).add(dayIndex, "day").format("MM-DD");
        }
      }
    }
  }

  checkConsumedInsats(tmpType) {
    for (let i = 0; i < this.state.insatser.length; ++i) {
      if (
        this.state.insatser[i].date >= this.state.weekStart &&
        this.state.insatser[i].date <= this.state.weekEnd
      ) {
        if (tmpType == this.state.insatser[i].insatsType) {
          return -1;
        }
      }
    }
    return 1;
  }

  setWeek(newWeek) {
    this.setState({
      weekStart: moment(this.state.weekStart)
        .add(newWeek, "week")
        .format("YYYY-MM-DD"),
      weekEnd: moment(this.state.weekEnd)
        .add(newWeek, "week")
        .format("YYYY-MM-DD"),
    });
  }

  renderDays(time, day, index) {
    for (let i = 0; i < 24; i++) {
      for (let i = 0; i < this.state.insatser.length; ++i) {
        if (
          this.state.insatser[i].fromTime == time &&
          this.state.insatser[i].date == day
        ) {
          return (
            <View key={this.state.insatser[i].key}>
              <Insats
                message={this.state.insatser[i].insatsType}
                id={this.state.insatser[i].key}
                navigation={this.props.navigation}
              />
            </View>
          );
        }
      }
    }
    return (
      <View style={styles.instatsListEmpty} key={index}>
        <Text></Text>
      </View>
    );
  }

  handleScroll = (event) => {
    this.setState({
      scrollOfsetY: event.nativeEvent.contentOffset.y,
    });
  };

  render() {
    const { insatser, dragging, days, insatsTypes, weekStart } = this.state;

    var today = moment(this.state.weekStart).format("YYYY-MM-DD");
    var aday2 = moment(this.state.weekStart).add(1, "day").format("YYYY-MM-DD");
    var aday3 = moment(this.state.weekStart).add(2, "day").format("YYYY-MM-DD");
    var aday4 = moment(this.state.weekStart).add(3, "day").format("YYYY-MM-DD");
    var aday5 = moment(this.state.weekStart).add(4, "day").format("YYYY-MM-DD");
    var aday6 = moment(this.state.weekStart).add(5, "day").format("YYYY-MM-DD");
    var aday7 = moment(this.state.weekStart).add(6, "day").format("YYYY-MM-DD");
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
            Vecka {moment(this.state.weekStart).format("WW")}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ImageBackground
            source={require("../../../assets/moln.png")}
            style={styles.moln}
          >
            {this.state.insatsTypes.map((item, index) => {
              return 1 === this.checkConsumedInsats(item) ? (
                <View key={index}>
                  <Draggable
                    message={item}
                    weekStart={this.state.weekStart}
                    insatser={this.state.insatser}
                    scrollOfsetY={this.state.scrollOfsetY}
                  />
                </View>
              ) : null;
            })}
          </ImageBackground>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "black" }}>
              <Button
                title={
                  "Vecka " +
                  moment(this.state.weekStart).add(-1, "week").format("WW")
                }
                onPress={() => this.setWeek(-1)}
                type="outline"
              />
            </View>
          </View>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "black" }}>
              <Button
                title="Logga Ut"
                onPress={() => this.logOut()}
                type="outline"
              />
            </View>
          </View>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "black" }}>
              <Button
                title={
                  "Vecka " +
                  moment(this.state.weekStart).add(1, "week").format("WW")
                }
                onPress={() => this.setWeek(1)}
                type="outline"
              />
            </View>
          </View>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "black" }}>
              <Button
                title="DagVy"
                onPress={() => this.props.navigation.navigate("DayScreen")}
                type="outline"
              />
            </View>
          </View>
        </View>

        <View style={styles.head}>
          <Text style={styles.headItems}></Text>
          {this.state.days.map((item, index) => {
            return (
              <Text style={styles.headItems} key={index}>
                {item}
              </Text>
            );
          })}
        </View>

        <ScrollView onScroll={this.handleScroll} scrollEnabled={!dragging}>
          <View style={styles.listContainer}>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return (
                  <Text style={styles.instatsList} key={index}>
                    {item}
                  </Text>
                );
              })}
            </View>

            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, today, index);
              })}
            </View>

            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday2, index);
              })}
            </View>

            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday3, index);
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday4, index);
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday5, index);
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday6, index);
              })}
            </View>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday7, index);
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
    backgroundColor: "rgba(49, 118, 197, 1.0)",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  listContainer: {
    backgroundColor: "black",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  instatsListEmpty: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ccc",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  moln: {
    flexDirection: "row",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: 100,
    width: 220,
    zIndex: 10,
  },
  button: {
    height: 50,
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
});
