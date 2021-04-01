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

        // var time0 = "00:00"



        if (this.isDropArea1x(gesture) && this.isDropArea1y(gesture, this.state.scrollOfsetY) ) {

          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("00:00", "fromTime");
          this.inputValueUpdate("01:00", "toTime");
          this.storeInsats();
          console.log(this.state.weekStart);
        } else if (this.isDropArea1x(gesture) && this.isDropArea2y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("01:00", "fromTime");
          this.inputValueUpdate("02:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea3y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("02:00", "fromTime");
          this.inputValueUpdate("03:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea4y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("03:00", "fromTime");
          this.inputValueUpdate("04:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea5y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("04:00", "fromTime");
          this.inputValueUpdate("05:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea6y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("05:00", "fromTime");
          this.inputValueUpdate("06:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea7y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("06:00", "fromTime");
          this.inputValueUpdate("07:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea8y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("07:00", "fromTime");
          this.inputValueUpdate("08:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea9y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("08:00", "fromTime");
          this.inputValueUpdate("9:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea10y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("09:00", "fromTime");
          this.inputValueUpdate("10:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea11y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("10:00", "fromTime");
          this.inputValueUpdate("11:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea12y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("11:00", "fromTime");
          this.inputValueUpdate("12:00", "toTime");


          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea13y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("12:00", "fromTime");
          this.inputValueUpdate("13:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea14y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("13:00", "fromTime");
          this.inputValueUpdate("14:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea15y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("14:00", "fromTime");
          this.inputValueUpdate("15:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea816y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("15:00", "fromTime");
          this.inputValueUpdate("16:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea17y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("16:00", "fromTime");
          this.inputValueUpdate("17:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea18y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("17:00", "fromTime");
          this.inputValueUpdate("18:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea19y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("18:00", "fromTime");
          this.inputValueUpdate("19:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea20y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("10:00", "fromTime");
          this.inputValueUpdate("20:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea21y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("20:00", "fromTime");
          this.inputValueUpdate("21:00", "toTime");

          this.storeInsats();
        }else if (this.isDropArea1x(gesture) && this.isDropArea22y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("21:00", "fromTime");
          this.inputValueUpdate("22:00", "toTime");
         

          this.storeInsats();
        } else if (this.isDropArea1x(gesture) && this.isDropArea23y(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(this.state.weekStart, "date");
          this.inputValueUpdate("22:00", "fromTime");
          this.inputValueUpdate("23:00", "toTime");
          console.log(aday7);
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        else if (this.isDropArea2x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday2, "date");
          this.storeInsats();
          console.log(aday2);
        } else if (this.isDropArea3x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday3, "date");
          this.storeInsats();
          console.log(aday3);
        } else if (this.isDropArea4x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday4, "date");
          this.storeInsats();
          console.log(aday4);
        } else if (this.isDropArea5x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday5, "date");
          this.storeInsats();
          console.log(aday5);
        } else if (this.isDropArea6x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday6, "date");
          this.storeInsats();
          console.log(aday6);
        } else if (this.isDropArea7x(gesture)) {
          this.inputValueUpdate(this.state.message, "insatsType");
          this.inputValueUpdate(aday7, "date");
          this.storeInsats();
          console.log(aday7);
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

  
  isDropArea1y(gesture, move) {
    return (
      gesture.moveY > 180 + move  &&
      gesture.moveY < 270 + move);
  }

  isDropArea2y(gesture) {
    return (
      gesture.moveY > 270 && 
      gesture.moveY < 310 
    );
  }
  isDropArea3y(gesture) {
    return (
      gesture.moveY > 310 &&
      gesture.moveY < 350 
    );
  }
  isDropArea4y(gesture) {
    return (
      gesture.moveY > 350 &&
      gesture.moveY < 400
    );
  }
  isDropArea5y(gesture) {
    return (
      gesture.moveY > 400 &&
      gesture.moveY < 440
    );
  }
  isDropArea6y(gesture) {
    return (
      gesture.moveY > 440 &&
      gesture.moveY < 480 
    );
  }
  isDropArea7y(gesture) {
    return (
      gesture.moveY > 480 &&
      gesture.moveY < 530 
    );
  }
  isDropArea8y(gesture) {
    return (
      gesture.moveY > 530 &&
      gesture.moveY < 580 
    );
  }
  isDropArea9y(gesture) {
    return (
      gesture.moveY > 580 &&
      gesture.moveY < 620
    );
  }
  isDropArea10y(gesture) {
    return (
      gesture.moveY > 620 &&
      gesture.moveY < 660 
    );
  }
  isDropArea11y(gesture) {
    return (
      gesture.moveY > 660 &&
      gesture.moveY < 700 
    );
  }
  isDropArea12y(gesture) {
    return (
      gesture.moveY > 700 &&
      gesture.moveY < 740
    );
  }
  isDropArea13y(gesture) {
    return (
      gesture.moveY > 740 &&
      gesture.moveY < 780
    );
  }
  isDropArea14y(gesture) {
    return (
      gesture.moveY > 780 &&
      gesture.moveY < 820 
    );
  }
  isDropArea15y(gesture) {
    return (
      gesture.moveY > 820 &&
      gesture.moveY < 860
    );
  }
  isDropArea16y(gesture) {
    return (
      gesture.moveY > 860 &&
      gesture.moveY < 900
    );
  }
  isDropArea17y(gesture) {
    return (
      gesture.moveY > 900 &&
      gesture.moveY < 940 
    );
  }
  isDropArea18y(gesture) {
    return (
      gesture.moveY > 940 &&
      gesture.moveY < 980 
    );
  }
  isDropArea19y(gesture) {
    return (
      gesture.moveY > 980 &&
      gesture.moveY < 1020
    );
  }
  isDropArea20y(gesture) {
    return (
      gesture.moveY > 1020 &&
      gesture.moveY < 1060
    );
  }
  isDropArea21y(gesture) {
    return (
      gesture.moveY > 1060 &&
      gesture.moveY < 1100
    );
  }
  isDropArea22y(gesture) {
    return (
      gesture.moveY > 1100 &&
      gesture.moveY < 1140 
    );
  }
  isDropArea23y(gesture) {
    return (
      gesture.moveY > 1140 &&
      gesture.moveY < 1180
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
