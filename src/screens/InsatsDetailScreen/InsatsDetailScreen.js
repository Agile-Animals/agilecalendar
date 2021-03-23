import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Modal,
} from "react-native";
import firebase from "../../database/firebaseDb";
import DropdownMenu from "react-native-dropdown-menu";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class InsatsDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boende: firebase.auth().currentUser.uid,
      fromTime: "",
      toTime: "",
      date: "",
      helperName: "",
      insatsType: "",
      freeText: "",
      isLoading: true,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.props.route.params.insatskey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const insats = res.data();
        this.setState({
          key: res.id,
          boende: insats.boende,
          fromTime: insats.fromTime,
          toTime: insats.toTime,
          date: insats.date,
          helperName: insats.helperName,
          insatsType: insats.insatsType,
          freeText: insats.freeText,
          isLoading: false,
          modalVisible: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateInsats() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.state.key);
    updateDBRef
      .set({
        boende: this.state.boende,
        fromTime: this.state.fromTime,
        toTime: this.state.toTime,
        date: this.state.date,
        helperName: this.state.helperName,
        insatsType: this.state.insatsType,
        freeText: this.state.freeText,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          boende: "",
          fromTime: "",
          toTime: "",
          helperName: "",
          insatsType: "",
          freeText: "",
          isLoading: false,
        });
        this.props.navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteInsats() {
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.props.route.params.insatskey);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
      this.props.navigation.navigate("HomeScreen");
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      "Ta Bort",
      "Är du säker?",
      [
        { text: "Ja", onPress: () => this.deleteInsats() },
        {
          text: "Nej",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

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
        <View style={styles.inputGroup}>
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
            //backgroundColor:"white",
            type:"outline",

          }}
        >
          <Button title="Datum" backgroundColor="white" onPress={() => this.setModalVisible(true)} />
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
              style={{ flex: 1 }}
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
              placeholder={this.state.freeText}
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
              onPress={() => this.updateInsats()}
              title="Updatera"
              type="outline"
              color="white"
            />
          </View>
          <View style={{ width: 120, backgroundColor: "white" }}>
            <Button
              onPress={this.openTwoButtonAlert}
              title="Ta Bort"
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
    justifyContent: "flex-end",
    margin: 90,
    borderBottomWidth: 1,
    fontSize: 20,
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
  insatsTyp: {
    width: 140,
    paddingLeft: 20,
  },
  button: {
    flex: 1,
    marginBottom: 49,
    flexDirection: "row",
    alignSelf: "flex-end",
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
    fontSize: 20,
  }
});

export default InsatsDetailScreen;
