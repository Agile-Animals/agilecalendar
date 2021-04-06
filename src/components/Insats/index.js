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

        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
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
    justifyContent: "space-between",
    shadowRadius: 2,
  },
  edit: {},
});
