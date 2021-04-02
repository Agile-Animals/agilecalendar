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
      weekStart: props.weekStart,
      scrollOfsetY: props.scrollOfsetY,
      gestY: [
        { min: 180, max: 280 },
        { min: 280, max: 330 },
        { min: 330, max: 370 },
        { min: 370, max: 410 },
        { min: 410, max: 455 },
        { min: 455, max: 510 },
        { min: 510, max: 555 },
        { min: 555, max: 600 },
        { min: 600, max: 645 },
        { min: 645, max: 690 },
        { min: 690, max: 730 },
        { min: 730, max: 776 },
        { min: 776, max: 825 },
        { min: 825, max: 875 },
        { min: 875, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
        { min: 1200, max: 1200 },
      ],
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event(
        [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
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
        this.isDropAreaY1(gesture);
        this.isDropAreaY2(gesture);
        this.isDropAreaY3(gesture);
        this.isDropAreaY4(gesture);
        this.isDropAreaY5(gesture);
        this.isDropAreaY6(gesture);
        this.isDropAreaY7(gesture);

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
    if (nextProps.scrollOfsetY != this.props.scrollOfsetY) return true;
    return true;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.weekStart !== prevProps.weekStart) {
      this.setState({ weekStart: this.props.weekStart });
    }
    if (this.props.scrollOfsetY !== prevProps.scrollOfsetY) {
      this.setState({ scrollOfsetY: this.props.scrollOfsetY });
    }
  }

  isDropAreaY1(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea1x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.state.weekStart, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
        console.log(gesture.moveY);
        console.log(gesture.moveY);
        console.log(gesture.moveY);
        console.log(gesture.moveY);
        console.log(gesture.moveY + this.state.scrollOfsetY);
        console.log(gesture.moveY + this.state.scrollOfsetY);
        console.log(gesture.moveY + this.state.scrollOfsetY);
        console.log(gesture.moveY + this.state.scrollOfsetY);
      }
    }
  }




  isDropAreaY2(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea2x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday2, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
      }
    }
  }

  isDropAreaY3(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea3x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday3, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
      }
    }
  }

  isDropAreaY4(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea4x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday4, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
      }
    }
  }

  isDropAreaY5(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea5x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday5, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
      }
    }
  }

  isDropAreaY6(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea6x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday6, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
      }
    }
  }

  isDropAreaY7(gesture) {
    for (let i = 0; i < 24; ++i) {
      if (
        this.isDropArea7x(gesture) &&
        gesture.moveY + this.state.scrollOfsetY > this.state.gestY[i].min &&
        gesture.moveY + this.state.scrollOfsetY < this.state.gestY[i].max
      ) {
        this.inputValueUpdate(this.state.message, "insatsType");
        this.inputValueUpdate(this.aday7, "date");
        this.inputValueUpdate(i + ":00", "fromTime");
        this.inputValueUpdate(i + 1 + ":00", "toTime");
        this.storeInsats();
        i = 25;
      }
    }
  }
  // isDropArea2y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 270 &&
  //     gesture.moveY + this.state.scrollOfsetY < 310
  //   );
  // }
  // isDropArea3y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 310 &&
  //     gesture.moveY + this.state.scrollOfsetY < 350
  //   );
  // }
  // isDropArea4y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 350 &&
  //     gesture.moveY + this.state.scrollOfsetY < 400
  //   );
  // }
  // isDropArea5y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 400 &&
  //     gesture.moveY + this.state.scrollOfsetY < 440
  //   );
  // }
  // isDropArea6y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 440 &&
  //     gesture.moveY + this.state.scrollOfsetY < 480
  //   );
  // }
  // isDropArea7y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 480 &&
  //     gesture.moveY + this.state.scrollOfsetY < 530
  //   );
  // }
  // isDropArea8y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 530 &&
  //     gesture.moveY + this.state.scrollOfsetY < 580
  //   );
  // }
  // isDropArea9y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 580 &&
  //     gesture.moveY + this.state.scrollOfsetY < 620
  //   );
  // }
  // isDropArea10y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 620 &&
  //     gesture.moveY + this.state.scrollOfsetY < 660
  //   );
  // }
  // isDropArea11y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 660 &&
  //     gesture.moveY + this.state.scrollOfsetY < 700
  //   );
  // }
  // isDropArea12y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 700 &&
  //     gesture.moveY + this.state.scrollOfsetY < 740
  //   );
  // }
  // isDropArea13y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 740 &&
  //     gesture.moveY + this.state.scrollOfsetY < 780
  //   );
  // }
  // isDropArea14y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 780 &&
  //     gesture.moveY + this.state.scrollOfsetY < 820
  //   );
  // }
  // isDropArea15y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 820 &&
  //     gesture.moveY + this.state.scrollOfsetY < 860
  //   );
  // }
  // isDropArea16y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 860 &&
  //     gesture.moveY + this.state.scrollOfsetY < 900
  //   );
  // }
  // isDropArea17y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 900 &&
  //     gesture.moveY + this.state.scrollOfsetY < 940
  //   );
  // }
  // isDropArea18y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 940 &&
  //     gesture.moveY + this.state.scrollOfsetY < 980
  //   );
  // }
  // isDropArea19y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 980 &&
  //     gesture.moveY + this.state.scrollOfsetY < 1020
  //   );
  // }
  // isDropArea20y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 1020 &&
  //     gesture.moveY + this.state.scrollOfsetY < 1060
  //   );
  // }
  // isDropArea21y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 1060 &&
  //     gesture.moveY + this.state.scrollOfsetY < 1100
  //   );
  // }
  // isDropArea22y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 1100 &&
  //     gesture.moveY + this.state.scrollOfsetY < 1140
  //   );
  // }
  // isDropArea23y(gesture) {
  //   console.log(gesture);
  //   return (
  //     gesture.moveY + this.state.scrollOfsetY > 1140 &&
  //     gesture.moveY + this.state.scrollOfsetY < 1180
  //   );
  // }

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
