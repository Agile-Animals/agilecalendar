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
    // this should instead only query for the current weeks insatser
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
        "Städning",
        "Tvätt",
        "Matlagning",
        "Inköp",
        "Ekonomi",
        "Aktivitet",
        "Dusch/bad",
        "Toalettbesök",
        "Uppsnyggning",
        "Matsituation",
        "Vila och sömn",
        "På-o avklädning",
        "Tillsyn",
        "Förflyttning",
        "Arbetsassistans",
        "Besök hos vårdgivare",
        "Bemötande",
      ],
      today: moment().format("YYYY-MM-DD"),
      weekStart: moment().startOf("isoWeek").format("YYYY-MM-DD"),
      weekEnd: moment().endOf("isoWeek").format("YYYY-MM-DD"),
      scrollOfsetY: "",
      initialScrollOffsetY: 0,
      layouts: [],
      insatsHeight: 0,
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
        helperID,
        insatsType,
        freeText,
      } = res.data();
      insatser.push({
        key: res.id,
        boende,
        fromTime,
        toTime,
        date,
        helperID,
        insatsType,
        freeText,
      });
    });
    this.setState({
      insatser,
      isLoading: false,
    });
  };

  // basic firestore logout function
  logOut() {
    loggingOut();
    this.props.navigation.replace("Login");
  }

  // used to set swedish names of days
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

  // decides what insatser to show in the cloud
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

  // set the weekStart variable to the week that has been chosen
  setWeek(newWeek) {
    this.setState({
      weekStart: moment(this.state.weekStart)
        .add(newWeek, "week")
        .format("YYYY-MM-DD"),
      weekEnd: moment(this.state.weekEnd)
        .add(newWeek, "week")
        .format("YYYY-MM-DD"),
    });
    this.state.layouts = [];
    this.scrollToInitialPosition();
  }

  // updates layouts array with the data of any insatser
  getLayout(
    layout,
    dayIndex,
    key,
    boende,
    fromTime,
    toTime,
    date,
    helperID,
    insatsType,
    freeText
  ) {
    this.state.layouts.push({
      height: layout.height,
      width: layout.width,
      x: layout.x + 140 * dayIndex,
      y: layout.y,
      key: key,
      boende: boende,
      fromTime: fromTime,
      toTime: toTime,
      date: date,
      helperID: helperID,
      insatsType: insatsType,
      freeText: freeText,
    });
  }

  // used to get the height of insatsblock on screen and set how far
  // we need to scroll down to show 07:00 as the first timeslot
  getLayoutHeight(layout) {
    this.setState({
      insatsHeight: layout.height,
      initialScrollOffsetY: layout.height * 7,
    });
  }

  // renders all insatser that can be dragged as insatser components
  renderDays(time, day, index, dayIndex, dayColor) {
    for (let i = 0; i < 24; i++) {
      for (let i = 0; i < this.state.insatser.length; ++i) {
        if (
          this.state.insatser[i].fromTime == time &&
          this.state.insatser[i].date == day
        ) {
          return (
            <View
              onLayout={(event) => {
                this.getLayout(
                  event.nativeEvent.layout,
                  dayIndex,
                  this.state.insatser[i].key,
                  this.state.insatser[i].boende,
                  this.state.insatser[i].fromTime,
                  this.state.insatser[i].toTime,
                  this.state.insatser[i].date,
                  this.state.insatser[i].helperID,
                  this.state.insatser[i].insatsType,
                  this.state.insatser[i].freeText
                );
              }}
              key={this.state.insatser[i].key}
            >
              <Insats
                message={this.state.insatser[i].insatsType}
                insats={this.state.insatser[i]}
                navigation={this.props.navigation}
                onSwap={this.onSwap.bind(this)}
                layouts={this.state.layouts}
                scrollOfsetY={this.state.scrollOfsetY}
                userID={this.state.helperID} // personnel ID
              />
            </View>
          );
        }
      }
    }
    if (dayIndex == 1) {
      return (
        <View style={styles.instatsListEmpty1} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 2) {
      return (
        <View style={styles.instatsListEmpty2} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 3) {
      return (
        <View style={styles.instatsListEmpty3} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 4) {
      return (
        <View style={styles.instatsListEmpty4} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 5) {
      return (
        <View style={styles.instatsListEmpty5} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 6) {
      return (
        <View style={styles.instatsListEmpty6} key={index}>
          <Text></Text>
        </View>
      );
    } else if (dayIndex == 7) {
      return (
        <View style={styles.instatsListEmpty7} key={index}>
          <Text></Text>
        </View>
      );
    }
  }

  // sets how far we have scrolled in the scrollview to keep y values correct when dragging insatser
  handleScroll = (event) => {
    this.setState({
      scrollOfsetY: event.nativeEvent.contentOffset.y,
    });
  };

  // removes duplets that are created in the moment when you swap two insatser
  onSwap(key1, key2) {
    let keyToSplice1 = 0,
      keyToSplice2 = 0;
    for (let i = 0; i < this.state.layouts.length; i++) {
      if (key1 == this.state.layouts[i].key) {
        keyToSplice1 = i;
      }
      if (key2 == this.state.layouts[i].key) {
        keyToSplice2 = i;
      }
    }
    if (keyToSplice1 < keyToSplice2) {
      this.state.layouts.splice(keyToSplice2, 1);
      this.state.layouts.splice(keyToSplice1, 1);
    } else {
      this.state.layouts.splice(keyToSplice1, 1);
      this.state.layouts.splice(keyToSplice2, 1);
    }
  }

  // Scrolls the ScrollView on HomeScreen as far as the value stored in initialScrollOffsetY
  // whose value is changed in
  scrollToInitialPosition = () => {
    this.scrollViewRef.scrollTo({
      y: this.state.initialScrollOffsetY,
      animated: false,
    });
  };

  // render function
  render() {
    const {
      insatser,
      dragging,
      days,
      insatsTypes,
      weekStart,
      layouts,
      insatsHeight,
    } = this.state;

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
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
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
                    insatsHeight={this.state.insatsHeight}
                    userID={firebase.auth().currentUser.uid} // unused when we have personnel
                  />
                </View>
              ) : null;
            })}
          </ImageBackground>
          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "white" }}>
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

          <View style={styles.header}>
            <View style={{ width: 120, backgroundColor: "white" }}>
              <Button
                title={
                  "Nuvarande Vecka: " + moment().startOf("isoWeek").format("WW")
                }
                onPress={() =>
                  this.setWeek(
                    moment().startOf("isoWeek").format("WW") -
                      moment(this.state.weekStart).format("WW")
                  )
                }
                type="outline"
              />
            </View>
            <View style={styles.header}>
              <Text>
                {" "}
                Det är nu vecka: {moment(this.state.weekStart).format(
                  "WW"
                )}{" "}
              </Text>
            </View>
          </View>

          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "white" }}>
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
            <View style={{ width: 120, backgroundColor: "white" }}>
              <Button
                title="Logga Ut"
                onPress={() => this.logOut()}
                type="outline"
              />
            </View>
          </View>

          <View style={styles.button}>
            <View style={{ width: 120, backgroundColor: "white" }}>
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

        <ScrollView
          ref={(ref) => {
            this.scrollViewRef = ref;
          }}
          onLayout={this.scrollToInitialPosition}
          onScroll={this.handleScroll}
          scrollEnabled={!dragging}
        >
          <View style={styles.listContainer}>
            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return (
                  <Text style={styles.instatsList} key={index}>
                    {item}
                  </Text>
                );
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, today, index, 1, "monday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday2, index, 2, "tuesday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(
                  item,
                  aday3,
                  index,
                  3,
                  "wednesday color"
                );
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday4, index, 4, "thursday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday5, index, 5, "friday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday6, index, 6, "saturday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "white" }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, aday7, index, 7, "sunday color");
              })}
            </View>

            <View style={{ width: 140, backgroundColor: "black" }}>
              <Text
                onLayout={(event) => {
                  this.getLayoutHeight(event.nativeEvent.layout);
                }}
                style={styles.instatsList}
              >
                Soptunna
              </Text>
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
    padding: 3,
    paddingTop: 50,
  },
  listContainer: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  item: {
    height: 43.5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  instatsList: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#ccc",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  instatsListEmpty1: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#45bf15",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty2: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#399bc2",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty3: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#c4c1b6",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty4: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#c4b347",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty5: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#e3e63c",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty6: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#e89eb4",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  instatsListEmpty7: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "#eb7852",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: -2,
  },
  moln: {
    marginTop: 43.33,
    flexDirection: "row",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: 130,
    width: 480,
    zIndex: 20,
    backgroundColor: "rgba(49, 118, 197, 1.0)",
  },
  button: {
    height: 40,
    width: 140,
    alignSelf: "flex-end",
    fontSize: 5,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    flexDirection: "row",
    marginTop: 5,
  },
  headItems: {
    width: 140,
    paddingLeft: 20,
    alignSelf: "center",
  },

  test: {
    width: 140,
    color: "red",
    backgroundColor: "rgba(49, 118, 197, 1.0)",
  },
  preloader: {
    backgroundColor: "blue",
  },
});
