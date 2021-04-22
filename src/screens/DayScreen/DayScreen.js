import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
  View,
  Animated,
  Pressable,
  Modal,
  ListItem,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";
import { Button, ThemeProvider } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Insats from "../../components/InsatsDay";
import moment from "moment";

export default class DayScreen extends Component {
  constructor(props) {
    super(props);
    this.firestoreRef = firebase
      .firestore()
      .collection("insatser")
      .where("boende", "==", firebase.auth().currentUser.uid);
    this.state = {
      modalVisible: false,
      // message: props.message,
      isLoading: true,
      insatser: [],
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

  // renderDays(time, day, index) {
  //   for (let i = 0; i < 24; i++) {
  //     for (let i = 0; i < this.state.insatser.length; ++i) {
  //       if (
  //         this.state.insatser[i].fromTime == time &&
  //         this.state.insatser[i].date == day
  //       ) {
  //         return (
  //           <View key={this.state.insatser[i].key} style={styles.instatsList}>
  //             <Insats message={this.state.insatser[i].insatsType} />
  //           </View>
  //         );
  //       }
  //     }
  //   }
  // }

  renderDays(time, day, index, dayIndex, dayColor) {
    for (let i = 0; i < 24; i++) {
      for (let i = 0; i < this.state.insatser.length; ++i) {
        if (
          this.state.insatser[i].fromTime == time &&
          this.state.insatser[i].date == day
        ) {
          return (
            <View
              key={this.state.insatser[i].key}
            >
              <Insats
                message={this.state.insatser[i].insatsType}
                insats={this.state.insatser[i]}
                navigation={this.props.navigation}
                scrollOfsetY={this.state.scrollOfsetY}
              />
            </View>
          );
        }
      }
    }
  }
  renderTimes(time, day, index) {
    for (let i = 0; i < 24; i++) {
      for (let i = 0; i < this.state.insatser.length; ++i) {
        if (
          this.state.insatser[i].fromTime == time &&
          this.state.insatser[i].date == day
        ) {
          return (
            <View key={this.state.insatser[i].key} style={styles.instatsList}>
              <Pressable>
                <Text> {this.state.insatser[i].fromTime} -{this.state.insatser[i].toTime} </Text>

              </Pressable>
            </View>
          );
        }
      }
    }
  }


  render() {
    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    // this.dynamicDays();
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
          <Text category="h2" style={{ fontSize: 30 }}>
            Dagvy
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            zIndex: 100,
          }}
        >
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
                title="VeckoVy"
                onPress={() => this.props.navigation.navigate("HomeScreen")}
                type="outline"
              />
            </View>
          </View>
        </View>
        <View style={styles.head}>
          <Text style={styles.headItems}></Text>
          {/* <Text style={styles.headItems}>{this.state.days[0]}</Text> */}
        </View>
        <ScrollView>
          <View style={styles.listContainer}>
            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderTimes(item, today, index);
              })}
            </View>

            <View style={{ width: 140 }}>
              {this.state.times.map((item, index) => {
                return this.renderDays(item, today, index);
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
    backgroundColor: "rgba(49, 118, 197, 1.0)",
    width: "100%",
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    shadowColor: "red",
  },
  instatsList: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    // change background to dayColor somehow
    backgroundColor: "white",
    shadowOpacity: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
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
});
