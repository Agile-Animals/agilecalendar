import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Text } from "react-native";
import firebase from "../../database/firebaseDb";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, ThemeProvider } from "react-native-elements";
import moment from "moment";

export default class Insats extends Component {
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
      id: props.id,
      navigation: props.navigation,
      layouts: props.layouts,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {},
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx == 0 && gesture.dy == 0) {
          this.state.navigation.navigate("InsatsDetailScreen", {
            insatskey: this.state.id,
          });
        }
        if (
          gesture.x0 + gesture.dx >= 1120 &&
          gesture.x0 + gesture.dx <= 1280 &&
          gesture.y0 + gesture.dy >= 220 &&
          gesture.y0 + gesture.dy <= 1200
        ) {
          this.deleteInsats();
        }
        for (let i = 0; i < this.state.layouts.length; ++i) {
          if (
            gesture.x0 + gesture.dx >= this.state.layouts[i].x &&
            gesture.x0 + gesture.dx <=
              this.state.layouts[i].x + this.state.layouts[i].width &&
            gesture.y0 + gesture.dy >= this.state.layouts[i].y + 220 &&
            gesture.y0 + gesture.dy <=
              this.state.layouts[i].y + this.state.layouts[i].height + 220
          ) {
            if (this.state.id != this.state.layouts[i].key) {
              console.log("\ndragged insats key:");
              console.log(this.state.id);
              console.log("dropped on insats key:");
              console.log(this.state.layouts[i].key);
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
    return true;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.layouts !== prevProps.layouts) {
      this.setState({ layouts: this.props.layouts });
    }
  }

  deleteInsats() {
    for (let i = 0; i < this.state.layouts.length; ++i) {
      if (this.state.layouts[i].key == this.state.id) {
        this.state.layouts.splice(i, 1);
      }
    }
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.state.id);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
    });
  }

  render() {
    const { message, id, indx } = this.state;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.instatsList]}
      >
        <Text key={this.state.id}>{this.state.message}</Text>
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
    backgroundColor: "#ccc",
    shadowOpacity: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
  },
  edit: {},
});
