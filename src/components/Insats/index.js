import React, { Component } from "react";
import { StyleSheet, View, PanResponder, Animated, Text } from "react-native";
import firebase from "../../database/firebaseDb";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, ThemeProvider } from "react-native-elements";
import moment from "moment";

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
      dayColor: props.dayColor,
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
            insatskey: this.state.insats.key,
          });
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
                this.state.layouts[i].y + 220 &&
              gesture.y0 + gesture.dy + this.state.scrollOfsetY <=
                this.state.layouts[i].y + this.state.layouts[i].height + 220
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
                this.props.onSwap(
                  this.state.insats.key,
                  this.state.layouts[i].key
                );
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
    // Typical usage (don't forget to compare props):
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

  deleteInsats() {
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
      console.log("Item removed from database");
    });
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
        helperName: insats.helperName,
        insatsType: insats.insatsType,
        freeText: insats.freeText,
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  render() {
    const { message, id } = this.state;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.instatsList]}
      >
        <Text key={this.state.id}>{message}</Text>
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
    // change background to dayColor somehow
    backgroundColor: "blue",
    shadowOpacity: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
  },
  edit: {},
});
