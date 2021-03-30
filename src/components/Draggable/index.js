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
      fromTime: "",
      toTime: "",
      date: new Date().toJSON().substring(0, 10),
      freeText: "",
    };

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


        // var time1 =  this.fromtime: "00:00";



        if (this.isDropArea1x(gesture) && this.isDropArea1y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('00:00', '01:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea2y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('01:00', '02:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea3y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('02:00', '03:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea4y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('03:00', '04:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea5y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('04:00', '05:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea6y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('05:00', '06:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea7y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('06:00', '07:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea8y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('07:00', '08:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea9y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('08:00', '09:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea10y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('09:00', '10:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea11y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('10:00', '11:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea12y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('11:00', '12:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea13y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('12:00', '13:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea14y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('13:00', '14:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea15y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('14:00', '15:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea816y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('15:00', '16:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea17y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('16:00', '17:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea18y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('17:00', '18:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea19y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('18:00', '19:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea20y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('19:00', '20:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea21y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('21:00', '22:00');
        }else if (this.isDropArea1x(gesture) && this.isDropArea22y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(today, "date");
          this.storeInsats('22:00', '23:00');
        }

        
        // else if (this.isDropArea3(gesture)) {
        //   this.inputValueUpdate(this.state.message, "insatsType");
        //   this.inputValueUpdate(aday3, "date");
        //   this.storeInsats();
        // } else if (this.isDropArea4(gesture)) {
        //   this.inputValueUpdate(this.state.message, "insatsType");
        //   this.inputValueUpdate(aday4, "date");
        //   this.storeInsats();
        // } else if (this.isDropArea5(gesture)) {
        //   this.inputValueUpdate(this.state.message, "insatsType");
        //   this.inputValueUpdate(aday5, "date");
        //   this.storeInsats();
        // } else if (this.isDropArea6(gesture)) {
        //   this.inputValueUpdate(this.state.message, "insatsType");
        //   this.inputValueUpdate(aday6, "date");
        //   this.storeInsats();
        // } else if (this.isDropArea7(gesture)) {
        //   this.inputValueUpdate(this.state.message, "insatsType");
        //   this.inputValueUpdate(aday7, "date");
        //   this.storeInsats();
        // }
        Animated.spring(this.state.pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    });
  }



  isDropArea1y(gesture) {
    return (
      gesture.moveY > 180 &&
      gesture.moveY < 270
    );
  }

  isDropArea2y(gesture) {
    return (
      gesture.moveY > 270 && 
      gesture.moveY < 315 
    );
  }
  isDropArea3y(gesture) {
    return (
      gesture.moveY > 315 &&
      gesture.moveY < 355 
    );
  }
  isDropArea4y(gesture) {
    return (
      gesture.moveY > 355 &&
      gesture.moveY < 400
    );
  }
  isDropArea5y(gesture) {
    return (
      gesture.moveY > 400 &&
      gesture.moveY < 445
    );
  }
  isDropArea6y(gesture) {
    return (
      gesture.moveY > 445 &&
      gesture.moveY < 490 
    );
  }
  isDropArea7y(gesture) {
    return (
      gesture.moveY > 490 &&
      gesture.moveY < 535 
    );
  }
  isDropArea8y(gesture) {
    return (
      gesture.moveY > 535 &&
      gesture.moveY < 580 
    );
  }
  isDropArea9y(gesture) {
    return (
      gesture.moveY > 580 &&
      gesture.moveY < 625
    );
  }
  isDropArea10y(gesture) {
    return (
      gesture.moveY > 625 &&
      gesture.moveY < 670 
    );
  }
  isDropArea11y(gesture) {
    return (
      gesture.moveY > 670 &&
      gesture.moveY < 715 
    );
  }
  isDropArea12y(gesture) {
    return (
      gesture.moveY > 715 &&
      gesture.moveY < 760
    );
  }
  isDropArea13y(gesture) {
    return (
      gesture.moveY > 760 &&
      gesture.moveY < 805 
    );
  }
  isDropArea14y(gesture) {
    return (
      gesture.moveY > 805 &&
      gesture.moveY < 850 
    );
  }
  isDropArea15y(gesture) {
    return (
      gesture.moveY > 850 &&
      gesture.moveY < 895
    );
  }
  isDropArea16y(gesture) {
    return (
      gesture.moveY > 895 &&
      gesture.moveY < 940
    );
  }
  isDropArea17y(gesture) {
    return (
      gesture.moveY > 940 &&
      gesture.moveY < 985 
    );
  }
  isDropArea18y(gesture) {
    return (
      gesture.moveY > 985 &&
      gesture.moveY < 1030  
    );
  }
  isDropArea19y(gesture) {
    return (
      gesture.moveY > 1030 &&
      gesture.moveY < 1075
    );
  }
  isDropArea20y(gesture) {
    return (
      gesture.moveY > 1075 &&
      gesture.moveY < 1120
    );
  }
  isDropArea21y(gesture) {
    return (
      gesture.moveY > 1120 &&
      gesture.moveY < 1165
    );
  }
  isDropArea22y(gesture) {
    return (
      gesture.moveY > 1165 &&
      gesture.moveY < 1210 
    );
  }
  isDropArea23y(gesture) {
    return (
      gesture.moveY > 1210 &&
      gesture.moveY < 1255
    );
  }








  isDropArea1x(gesture) {
    return (
      gesture.moveX > 140 &&
      gesture.moveX < 280 
    );
  }



  isDropArea2x(gesture) {
    return (
      gesture.moveX < 420 &&
      gesture.moveX > 280
    );
  }


  isDropArea3x(gesture) {
    return (
      gesture.moveX < 560 &&
      gesture.moveX > 420
    );
  }
  isDropArea4x(gesture) {
    return (
      gesture.moveX < 700 &&
      gesture.moveX > 560
    );
  }
  isDropArea5x(gesture) {
    return (
      gesture.moveX < 840 &&
      gesture.moveX > 700
    );
  }
  isDropArea6x(gesture) {
    return (
      gesture.moveX < 980 &&
      gesture.moveX > 840
    );
  }
  isDropArea7x(gesture) {
    return (
      gesture.moveX < 1120 &&
      gesture.moveX > 980
    );
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeInsats(time1, time2) {
    this.dbRef.add({
      helperName: "test",
      insatsType: this.state.insatsType,
      boende: firebase.auth().currentUser.uid,
      fromtime: time1,
      toTime: time2,
      date: this.state.date,
      freeText: "",
    });
  }


  render() {
    return <View>{this.renderDraggable()}</View>;
  }

  renderDraggable() {
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
    borderRadius: 12,
    marginTop: 1,
    marginBottom: 1,
    borderWidth: 1,
  },
});
