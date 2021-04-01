import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Alert,
} from "react-native";
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
      weekStart: props.weekStart,
      insatser: props.insatser,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        var aday2 = moment(this.state.weekStart)
          .add(1, "day")
          .format("YYYY-MM-DD");
        var aday3 = moment(this.state.weekStart)
          .add(2, "day")
          .format("YYYY-MM-DD");
        var aday4 = moment(this.state.weekStart)
          .add(3, "day")
          .format("YYYY-MM-DD");
        var aday5 = moment(this.state.weekStart)
          .add(4, "day")
          .format("YYYY-MM-DD");
        var aday6 = moment(this.state.weekStart)
          .add(5, "day")
          .format("YYYY-MM-DD");
        var aday7 = moment(this.state.weekStart)
          .add(6, "day")
          .format("YYYY-MM-DD");
        if (this.isDropArea1(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
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

  shouldComponentUpdate(nextProps) {
    if (nextProps.weekStart != this.props.weekStart) return true;
    if (nextProps.insatser != this.props.insatser) return true;
    return true;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.weekStart !== prevProps.weekStart) {
      this.setState({ weekStart: this.props.weekStart });
    }
    if (this.props.insatser !== prevProps.insatser) {
      this.setState({ insatser: this.props.insatser });
    }
  }

  isDropArea1(gesture) {
    return (
      gesture.moveY < 1200 &&
      gesture.moveY > 180 &&
      gesture.moveX < 280 &&
      gesture.moveX > 140
    );
  }
  isDropArea2(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 420 &&
      gesture.moveX > 280
    );
  }
  isDropArea3(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 560 &&
      gesture.moveX > 420
    );
  }
  isDropArea4(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 700 &&
      gesture.moveX > 560
    );
  }
  isDropArea5(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 840 &&
      gesture.moveX > 700
    );
  }
  isDropArea6(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 980 &&
      gesture.moveX > 840
    );
  }
  isDropArea7(gesture) {
    return (
      gesture.moveY < 630 &&
      gesture.moveY > 180 &&
      gesture.moveX < 1120 &&
      gesture.moveX > 980
    );
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeInsats() {
    let duplet = 0;
    if (this.state.insatser.length == 0) {
      this.dbRef.add({
        helperName: "test",
        insatsType: this.state.insatsType,
        boende: firebase.auth().currentUser.uid,
        fromTime: "08:00",
        toTime: "09:00",
        date: this.state.date,
        freeText: "",
      });
      duplet = 1;
    } else {
      for (let i = 0; i < this.state.insatser.length; ++i) {
        if (this.state.date == this.state.insatser[i].date) {
          if (
            this.state.fromTime >= this.state.insatser[i].fromTime &&
            this.state.toTime <= this.state.insatser[i].toTime
          ) {
            Alert.alert(
              "Du har bokat:\n" + this.state.insatser[i].insatsType + " då."
            );
            duplet = 1;
            i = this.state.insatser.length + 2;
          }
        }
      }
    }
    if (duplet == 0) {
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
  }

  render() {
    return <View>{this.renderDraggable()}</View>;
  }

  renderDraggable() {
    const { message, weekStart } = this.state;

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
    borderRadius: 12,
    marginTop: 1,
    marginBottom: 1,
    borderWidth: 1,
  },
});
