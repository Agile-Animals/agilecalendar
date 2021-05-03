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

  // helps keep these props updated
  shouldComponentUpdate(nextProps) {
    if (nextProps.weekStart != this.props.weekStart) return true;
    if (nextProps.insatser != this.props.insatser) return true;
    if (nextProps.scrollOfsetY != this.props.scrollOfsetY) return true;
    if (nextProps.insatsHeight != this.props.insatsHeight) return true;
    return true;
  }

  // helps keep these props updated
  componentDidUpdate(prevProps) {
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

  // checks if you have dropped something in this area and creates the appropriate insats
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

  // using schedule checks if there are any free personnel between two times
  // toDo: get documents read them and then overwrite correct one if the wanted times are free
  async checkPersonnel(fromTime, toTime, date) {
    let timeDocs = [
      [
        "00:00-07:00 1",
        "07:00-12:00 2",
        "12:00-19:00 3",
        "19:00-23:00 2",
        "23:00-24:00 1",
      ],
      [
        "00:00-07:00 1",
        "07:00-11:00 2",
        "11:00-20:00 3",
        "20:00-23:00 2",
        "23:00-24:00 1",
      ],
    ];
    var dayType = "vardag";
    var docIndex = 0;
    if (
      moment(date).format("ddd") == "Sat" ||
      moment(date).format("ddd") == "Sun"
    ) {
      dayType = "helg";
      docIndex = 1;
    }
    for (let i = 0; i < 5; ++i) {
      let [a, b] = timeDocs[docIndex][i].split("-");
      let [c, d] = b.split(" ");
      if (fromTime >= a && toTime <= b) {
        const updateDBRef = await firebase
          .firestore()
          .collection(dayType)
          .doc(timeDocs[docIndex][i]);
        let doc = await updateDBRef.get();
        var newTimes = [];
        var data = await doc.data();
        let personnelNr = 0;
        data.times.map((item, index) => {
          newTimes.push(item);
          if (item == fromTime + "," + toTime + "," + date) {
            personnelNr++;
          }
        });
        if (personnelNr < d) {
          newTimes.push(fromTime + "," + toTime + "," + date);
          updateDBRef.set(
            {
              times: newTimes,
            },
            { merge: true }
          );
        } else {
          Alert.alert("Tyvärr så finns inte nog med personal denna tid.");
          return 0;
        }
        i = 6;
      }
    }
    return 1;
  }

  async insatsMoreThanOne(insatstype, boende) {
    let insatserna = [
      "Städning_2",
      "Tvätt_1",
      "Matlagning_1",
      "Inköp_1",
      "Ekonomi_1",
      "Aktivitet_1",
      "Dusch/bad_1",
      "Toalettbesök_1",
      "Uppsnyggning_1",
      "Matsituation_1",
      "Vila och sömn_1",
      "På-o avklädning_1",
      "Tillsyn_1",
      "Förflyttning_1",
      "Arbetsassistans_1",
      "Besök hos vårdgivare_1",
      "Bemötande_1",
    ];
    // var insatsTimes = ;
    var veckaNummer = moment(this.state.weekStart).format("WW");
    var år = moment(this.state.weekStart).format("YYYY");
    for (i = 0; i < 17; ++i) {
      let [a, b] = insatserna[i].split("_");
      if (a == insatstype) {
  const updateDBRef = await firebase
    .firestore()
    .collection("insatsTimes")
    .doc(insatserna[i]);
    let doc = await updateDBRef.get();
    var newInsatsTimes = [];
    var data = await doc.data();
    let insansnum = 0;
    data.insatss.map((item, index) => {
            newInsatsTimes.push(item);
            if (item == insatstype + "," + boende + "," + veckaNummer +","+ år) {
              insansnum++;
            }
          });
          if (insansnum < b) {
            newInsatsTimes.push(insatstype + "," + boende + "," +veckaNummer + ","+ år);
            updateDBRef.set(
              {
                insatss: newInsatsTimes,
              },
              { merge: true }
            );
          } else {
            Alert.alert("Tyvärr så finns inte nog med personal denna tid.");
            return 0;
          }
          i = 18;
        }
      }
      return 1;
      }

  // creates insats unless there already is one at the time and date
  async storeInsats() {
    let duplet = 0;
    let personAvailable = await this.checkPersonnel(
      this.state.fromTime,
      this.state.toTime,
      this.state.date
    );

    let insatsManyTimes = await this.insatsMoreThanOne(
      this.state.insatsType,
      this.state.boende,

    );
    // this.insatsMoreThanOne(this.state.insatsType);
    if (this.state.insatser.length == 0 && personAvailable == 1 && insatsManyTimes == 1) {
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
    if (duplet == 0 && personAvailable == 1 && insatsManyTimes == 1) {
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
    backgroundColor: "white",
  },
});
