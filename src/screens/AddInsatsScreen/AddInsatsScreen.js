import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Modal,
  Alert,
} from "react-native";
import firebase from "../../database/firebaseDb";
import DropdownMenu from "react-native-dropdown-menu";
import CalendarPicker from "react-native-calendar-picker";
import { Button, ThemeProvider } from "react-native-elements";
import { loggingOut } from "../../API/firebaseMethods";
import { BorderlessButton } from "react-native-gesture-handler";

class AddInsatsScreen extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection("insatser");
    this.state = {
      helperName: "",
      insatsType: "Fritext",
      boende: firebase.auth().currentUser.uid,
      fromTime: "08:00",
      toTime: "09:00",
      date: new Date().toJSON().substring(0, 10),
      freeText: "",
      isLoading: false,
      modalVisible: false,
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeInsats() {
    if (this.state.helperName === "") {
      alert("Fill at least your name!");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          helperName: this.state.helperName,
          insatsType: this.state.insatsType,
          boende: this.state.boende,
          fromTime: this.state.fromTime,
          toTime: this.state.toTime,
          date: this.state.date,
          freeText: this.state.freeText,
        })
        .then((res) => {
          this.setState({
            helperName: "",
            insatsType: "",
            boende: "",
            fromTime: "",
            toTime: "",
            freeText: "",
            isLoading: false,
          });

          this.props.navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  onDateChange(date) {
    this.setState({
      date: date.toJSON().substring(0, 10),
    });
    this.setModalVisible(false);
  }

  render() {
    var data = [["Fritext", "Städa", "Tvätta", "Handla", "Duscha"]];
    var timeData = [
      [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
    ];
    const { date, modalVisible } = this.state;
    const startDate = date ? date.toString() : "";
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            justifyContent: "flex-end",
            margin: 90,
            borderBottomWidth: 1,
            fontSize: 20,
          }}
        >
          <TextInput
            style={{
              borderBottomWidth: 1,
              fontSize: 30,
            }}
            placeholder={"Hjälpare"}
            placeholderTextColor="white"
            value={this.state.helperName}
            onChangeText={(val) => this.inputValueUpdate(val, "helperName")}
          />
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            marginBottom: 30,
            marginLeft: 80,
            marginRight: 80,
          }}
        >
          <Button title="Datum" onPress={() => this.setModalVisible(true)} />
        </View>

        <View style={styles.timeDropdown}>
          <View style={styles.timeFrom}>
            <Text style={styles.text}>Från:</Text>
            <DropdownMenu
              style={{ flex: 1 }}
              bgColor={"white"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              handler={(selection, row) =>
                this.setState({ fromTime: timeData[selection][row] })
              }
              data={timeData}
            ></DropdownMenu>
          </View>

          <View style={styles.timeTo}>
            <Text style={styles.text}>Till:</Text>
            <DropdownMenu
              style={{ flex: 1 }}
              bgColor={"white"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              handler={(selection, row) =>
                this.setState({ toTime: timeData[selection][row] })
              }
              data={timeData}
            ></DropdownMenu>
          </View>

          <View style={styles.insatsTyp}>
            <Text style={styles.text}>Insats typ:</Text>
            <DropdownMenu
              style={{
                flex: 1,
              }}
              bgColor={"white"}
              tintColor={"#666666"}
              activityTintColor={"green"}
              handler={(selection, row) =>
                this.setState({ insatsType: data[selection][row] })
              }
              data={data}
            ></DropdownMenu>
          </View>
          <View style={styles.freeText}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                fontSize: 30,
              }}
              placeholder={"Fritext..."}
              placeholderTextColor="white"
              value={this.state.freeText}
              onChangeText={(val) => this.inputValueUpdate(val, "freeText")}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Nuvarande datum för insatsen: " + date);
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.inputGroup}>
            <CalendarPicker onDateChange={this.onDateChange} />
          </View>
        </Modal>

        <View style={styles.button}>
        <View style={{ width: 120, backgroundColor: "white" }}>
          <Button
            onPress={() => this.storeInsats()}
            title="Spara Insats"
            
            type="outline"

          />
        </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#003f5c",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  Dropdown: {
    flex: 1,
    marginBottom: 250,
  },
  timeDropdown: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 400,
    marginTop: 50,
  },
  timeFrom: {
    width: 160,
    paddingRight: 20,
  },
  timeTo: {
    width: 140,
  },
  button: {
    flex: 1,
    padding: 0,
    marginBottom: 49,
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
  insatsTyp: {
    width: 140,
    paddingLeft: 20,
  },
  freeText: {
    flex: 1,
    marginBottom: 49,
    paddingLeft: 40,
    paddingTop: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  text: {
    color: "white",
    fontSize: 25,
  }
});

export default AddInsatsScreen;
