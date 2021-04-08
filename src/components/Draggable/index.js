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
      fromTime: "",
      toTime: "",
      date: new Date().toJSON().substring(0, 10),
      freeText: "",
      weekStart: props.weekStart,
      insatser: props.insatser,
      scrollOfsetY: props.scrollOfsetY,
      insatsHeight: props.insatsHeight,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        if (
          this.state.weekStart <
          moment().startOf("isoWeek").format("YYYY-MM-DD")
        ) {
          Alert.alert(
            "Du kan inte skapa insatser innan nuvarande vecka (" +
              moment().startOf("isoWeek").format("WW") +
              ", " +
              moment().startOf("isoWeek").format("YYYY") +
              ")."
          );
        } else {
          this.aday2 = moment(this.state.weekStart)
            .add(1, "day")
            .format("YYYY-MM-DD");
          this.aday3 = moment(this.state.weekStart)
            .add(2, "day")
            .format("YYYY-MM-DD");
          this.aday4 = moment(this.state.weekStart)
            .add(3, "day")
            .format("YYYY-MM-DD");
          this.aday5 = moment(this.state.weekStart)
            .add(4, "day")
            .format("YYYY-MM-DD");
          this.aday6 = moment(this.state.weekStart)
            .add(5, "day")
            .format("YYYY-MM-DD");
          this.aday7 = moment(this.state.weekStart)
            .add(6, "day")
            .format("YYYY-MM-DD");
          if (this.isDropAreaY1(gesture)) {
          } else if (this.isDropAreaY2(gesture)) {
          } else if (this.isDropAreaY3(gesture)) {
          } else if (this.isDropAreaY4(gesture)) {
          } else if (this.isDropAreaY5(gesture)) {
          } else if (this.isDropAreaY6(gesture)) {
          } else if (this.isDropAreaY7(gesture)) {
          }
        }

        {
          Animated.sequence([
            Animated.delay(300),
            Animated.spring(this.state.pan, {
              toValue: { x: 0, y: 0 },
              bounciness: 0,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    });
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.weekStart != this.props.weekStart) return true;
    if (nextProps.insatser != this.props.insatser) return true;
    if (nextProps.scrollOfsetY != this.props.scrollOfsetY) return true;
    if (nextProps.insatsHeight != this.props.insatsHeight) return true;
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
    if (this.props.scrollOfsetY !== prevProps.scrollOfsetY) {
      this.setState({ scrollOfsetY: this.props.scrollOfsetY });
    }
    if (this.props.insatsHeight !== prevProps.insatsHeight) {
      this.setState({ insatsHeight: this.props.insatsHeight });
    }
  }

  isDropAreaY1(gesture) {
    if (this.isDropArea1x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY2(gesture) {
    if (this.isDropArea2x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday2, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY3(gesture) {
    if (this.isDropArea3x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday3, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY4(gesture) {
    if (this.isDropArea4x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday4, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY5(gesture) {
    if (this.isDropArea5x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday5, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY6(gesture) {
    if (this.isDropArea6x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday6, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropAreaY7(gesture) {
    if (this.isDropArea7x(gesture)) {
      let tmpFrom = "",
        tmpTo = "";
      let tmpInt = 0;
      for (let i = 0; i < 24; ++i) {
        if (
          gesture.moveY + this.state.scrollOfsetY >
            220 + i * this.state.insatsHeight &&
          gesture.moveY + this.state.scrollOfsetY <
            220 + (i + 1) * this.state.insatsHeight
        ) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.aday7, "date");
          if (i < 10) {
            tmpFrom = "0";
            tmpTo = "0";
            if (i == 9) {
              tmpTo = "";
            }
          }
          tmpInt = i + 1;
          this.inputValueUpdate(tmpFrom + i + ":00", "fromTime");
          this.inputValueUpdate(tmpTo + tmpInt + ":00", "toTime");
          this.storeInsats();
          i = 25;
        }
      }
    }
  }

  isDropArea1x(gesture) {
    return gesture.moveX > 140 && gesture.moveX < 280;
  }
  isDropArea2x(gesture) {
    return gesture.moveX < 420 && gesture.moveX > 280;
  }
  isDropArea3x(gesture) {
    return gesture.moveX < 560 && gesture.moveX > 420;
  }
  isDropArea4x(gesture) {
    return gesture.moveX < 700 && gesture.moveX > 560;
  }
  isDropArea5x(gesture) {
    return gesture.moveX < 840 && gesture.moveX > 700;
  }
  isDropArea6x(gesture) {
    return gesture.moveX < 980 && gesture.moveX > 840;
  }
  isDropArea7x(gesture) {
    return gesture.moveX < 1120 && gesture.moveX > 980;
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
        fromTime: this.state.fromTime,
        toTime: this.state.toTime,
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
              "Du har redan bokat:\n" +
                this.state.insatser[i].insatsType +
                " då."
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
        fromTime: this.state.fromTime,
        toTime: this.state.toTime,
        date: this.state.date,
        freeText: "",
      });
    }
  }

  render() {
    return <View>{this.renderDraggable()}</View>;
  }

  renderDraggable() {
    const { message, weekStart, insatsHeight } = this.state;

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
    height: 30,
    borderRadius: 12,
    marginTop: 1,
    marginBottom: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
