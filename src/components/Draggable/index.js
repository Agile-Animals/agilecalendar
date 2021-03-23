import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Text } from "react-native";
import firebase from "../../database/firebaseDb";
import moment from "moment";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection("insatser");
    this.state = {
      pan: new Animated.ValueXY(),
      message: props.message,
      helperName: "test",
      insatsType: "Fritext",
      boende: firebase.auth().currentUser.uid,
      fromTime: "08:00",
      toTime: "09:00",
      date: new Date().toJSON().substring(0, 10),
      freeText: "",
    };
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 };
    this.state.pan.addListener((value) => (this._val = value));
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        var today = new Date();
        today = moment(today).add(0, "day").format("YYYY-MM-DD");
        var aday2 = moment(today).add(1, "day").format("YYYY-MM-DD");
        var aday3 = moment(today).add(2, "day").format("YYYY-MM-DD");
        var aday4 = moment(today).add(3, "day").format("YYYY-MM-DD");
        var aday5 = moment(today).add(4, "day").format("YYYY-MM-DD");
        var aday6 = moment(today).add(5, "day").format("YYYY-MM-DD");
        var aday7 = moment(today).add(6, "day").format("YYYY-MM-DD");
        if (this.isDropArea1(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats();
        } else if (this.isDropArea2(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday2, "date");
          this.storeInsats();
        } else if (this.isDropArea3(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday3, "date");
          this.storeInsats();
        } else if (this.isDropArea4(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday4, "date");
          this.storeInsats();
        } else if (this.isDropArea5(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday5, "date");
          this.storeInsats();
        } else if (this.isDropArea6(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday6, "date");
          this.storeInsats();
        } else if (this.isDropArea7(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday7, "date");
          this.storeInsats();
        }
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    });
  }

  isDropArea1(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 420 &&
      gesture.moveX > 280
    );
  }
  isDropArea2(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 560 &&
      gesture.moveX > 420
    );
  }
  isDropArea3(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 700 &&
      gesture.moveX > 560
    );
  }
  isDropArea4(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 840 &&
      gesture.moveX > 700
    );
  }
  isDropArea5(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 980 &&
      gesture.moveX > 840
    );
  }
  isDropArea6(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 1120 &&
      gesture.moveX > 980
    );
  }
  isDropArea7(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 1260 &&
      gesture.moveX > 1120
    );
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeInsats() {
    this.dbRef.add({
      helperName: "test",
      insatsType: this.state.insatsType,
      boende: firebase.auth().currentUser.uid,
      fromTime: "08:00",
      toTime: "09:00",
      date: this.state.date,
      freeText: "",
    });
  }

  render() {
    const { message } = this.state;

    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}
      >
        <Text> {this.state.message} </Text>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  circle: {
    width: 60,
    height: 25,
    borderRadius: 12,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    alignItems: "center",
  },
});
