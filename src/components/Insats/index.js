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
      fromTime: "00:00",
      toTime: "00:00",
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
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    });
  }

  // isDropArea1(gesture) {
  //   return (
  //     gesture.moveY < 1200 &&
  //     gesture.moveY > 180 &&
  //     gesture.moveX < 280 &&
  //     gesture.moveX > 140
  //   );
  // }

  // storeInsats() {
  //   this.dbRef.add({
  //     helperName: "test",
  //     insatsType: this.state.insatsType,
  //     boende: firebase.auth().currentUser.uid,
  //     fromTime: "08:00",
  //     toTime: "09:00",
  //     date: this.state.date,
  //     freeText: "",
  //   });
  // }

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
        <Button
          style={styles.edit}
          onPress={() => {
            this.state.navigation.navigate("InsatsDetailScreen", {
              insatskey: this.state.id,
            });
          }}
        />
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
