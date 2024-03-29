import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import firebase from "../../database/firebaseDb";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, ThemeProvider } from "react-native-elements";
import moment, { relativeTimeRounding } from "moment";

export default class Insats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      message: props.message,
      boende: firebase.auth().currentUser.uid,
      insats: props.insats,
      navigation: props.navigation,
      layouts: props.layouts,
      scrollOfsetY: props.scrollOfsetY,
      modalVisible: false,
      topPadding: 222, // should be dynamic
      helperID: "29iAmOUm7OPnDZMSpQtGJ6P2Get1", // ID of personnel account on firestore
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        // console.log(e);
      },
      onPanResponderTerminationRequest: (e, gesture) => false,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx == 0 && gesture.dy == 0) {
          this.setModalVisible(true);
        } else if (
          gesture.x0 + gesture.dx >= 1120 &&
          gesture.x0 + gesture.dx <= 1280 &&
          gesture.y0 + gesture.dy >= 220 &&
          gesture.y0 + gesture.dy <= 1200
        ) {
          this.deleteInsats();
        } else {
          for (let i = 0; i < this.state.layouts.length; ++i) {
            if (
              gesture.x0 + gesture.dx >= this.state.layouts[i].x &&
              gesture.x0 + gesture.dx <=
                this.state.layouts[i].x + this.state.layouts[i].width &&
              gesture.y0 + gesture.dy + this.state.scrollOfsetY >=
                this.state.layouts[i].y + this.state.topPadding &&
              gesture.y0 + gesture.dy + this.state.scrollOfsetY <=
                this.state.layouts[i].y +
                  this.state.layouts[i].height +
                  this.state.topPadding
            ) {
              if (this.state.insats.key != this.state.layouts[i].key) {
                let tmpFrom = this.state.insats.fromTime;
                let tmpTo = this.state.insats.toTime;
                let tmpDate = this.state.insats.date;
                this.updateInsats(
                  this.state.insats,
                  this.state.layouts[i].fromTime,
                  this.state.layouts[i].toTime,
                  this.state.layouts[i].date
                );
                this.updateInsats(
                  this.state.layouts[i],
                  tmpFrom,
                  tmpTo,
                  tmpDate
                );
                let swapType = this.state.layouts[i].insatsType;
                let swapDate = this.state.layouts[i].date;
                this.props.onSwap(
                  this.state.insats.key,
                  this.state.layouts[i].key
                );
                this.sendNotification(swapType, swapDate);
                i = this.state.layouts.length + 2;
              } else {
                i = this.state.layouts.length + 2;
              }
            }
          }
        }
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.layouts != this.props.layouts) return true;
    if (nextProps.insats != this.props.insats) return true;
    if (nextProps.scrollOfsetY != this.props.scrollOfsetY) return true;
    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.layouts !== prevProps.layouts) {
      this.setState({ layouts: this.props.layouts });
    }
    if (this.props.insats !== prevProps.insats) {
      this.setState({ insats: this.props.insats });
    }
    if (this.props.scrollOfsetY !== prevProps.scrollOfsetY) {
      this.setState({ scrollOfsetY: this.props.scrollOfsetY });
    }
  }

  // handles creation/deleting of insats pushnotifications in the if statement
  // and swapping of insatser in the else statement
  // swapType and swapDate only ever have values when we are swapping.
  async sendNotification(swapType = "", swapDate = "") {
    const updateDBRef = firebase
      .firestore()
      .collection("users")
      .doc(this.state.helperID);
    let doc = await updateDBRef.get();
    var newTimes = [];
    var pushToken = await doc.data().pushToken;
    if (swapType === "") {
      // console.log("add/del");
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          data: { extractData: "Some data" },
          title: "Insats borttagen:",
          body:
            this.state.insats.insatsType +
            " " +
            this.state.insats.fromTime +
            "-" +
            this.state.insats.toTime +
            " " +
            moment(this.state.insats.date).format("DD/MM/YYYY"),
        }),
      });
    } else {
      // console.log("swap");
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          data: { extractData: "Some data" },
          title: "Insatser bytta:",
          body:
            this.state.insats.insatsType +
            " " +
            moment(this.state.insats.date).format("DD/MM") +
            ", " +
            swapType +
            " " +
            moment(swapDate).format("DD/MM"),
        }),
      });
    }
  }

  // removes insats from database and also removes its' values from layouts
  async deleteInsats() {
    this.freePersonnel(
      this.state.insats.fromTime,
      this.state.insats.toTime,
      this.state.insats.date
    );
    for (let i = 0; i < this.state.layouts.length; ++i) {
      if (this.state.layouts[i].key == this.state.insats.key) {
        this.state.layouts.splice(i, 1);
      }
    }
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.state.insats.key);
    dbRef.delete().then((res) => {
      // console.log("Item removed from database");
    });
    this.sendNotification();
  }

  // frees booked personnel when deleting insats
  async freePersonnel(fromTime, toTime, date) {
    let timeDocs = [
      [
        "00:00-07:00 1",
        "07:00-12:00 2",
        "12:00-19:00 3",
        "19:00-23:00 2",
        "23:00-24:00 1",
      ],
      [
        "00:00-07:00 1",
        "07:00-11:00 2",
        "11:00-20:00 3",
        "20:00-23:00 2",
        "23:00-24:00 1",
      ],
    ];
    var dayType = "vardag";
    var docIndex = 0;
    if (
      moment(date).format("ddd") == "Sat" ||
      moment(date).format("ddd") == "Sun"
    ) {
      dayType = "helg";
      docIndex = 1;
    }
    for (let i = 0; i < 5; ++i) {
      let [a, b] = timeDocs[docIndex][i].split("-");
      let [c, d] = b.split(" ");
      if (fromTime >= a && toTime <= b) {
        const updateDBRef = firebase
          .firestore()
          .collection(dayType)
          .doc(timeDocs[docIndex][i]);
        let doc = await updateDBRef.get();
        var newTimes = [];
        var data = await doc.data();
        var timeIndex = 0,
          cnt = 0,
          found = 0;
        data.times.map((item, index) => {
          newTimes.push(item);
          if (item == fromTime + "," + toTime + "," + date) {
            timeIndex = cnt;
            found = 1;
          } else {
            cnt++;
          }
        });
        if (found == 1) {
          newTimes.splice(timeIndex, 1);
          updateDBRef.set({
            times: newTimes,
          });
        }
        i = 6;
      }
    }
    return 0;
  }

  updateInsats(insats, newFrom, newTo, newDate) {
    const updateDBRef = firebase
      .firestore()
      .collection("insatser")
      .doc(insats.key);
    updateDBRef
      .set({
        boende: insats.boende,
        fromTime: newFrom,
        toTime: newTo,
        date: newDate,
        helperID: insats.helperID,
        insatsType: insats.insatsType,
        freeText: insats.freeText,
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { message, id, modalVisible } = this.state;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.instatsList]}
      >
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalText}>
                  <Text style={{ fontSize: 22 }}>{message}</Text>
                  <Text style={{ fontSize: 17 }}>
                    Från: {this.state.insats.fromTime} - Till:{" "}
                    {this.state.insats.toTime}
                  </Text>
                  <Text style={{ fontSize: 17 }}>
                    Datum: {moment(this.state.insats.date).format("DD/MM/YYYY")}
                  </Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}> Dölj </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Text key={this.state.id}>{message}</Text>
        </View>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  instatsList: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
    zIndex: 20,
    width: 140,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ff8c00",
    borderRadius: 10,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      zIndex: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
