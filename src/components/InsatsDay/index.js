import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
  Text,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import firebase from "../../database/firebaseDb";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, ThemeProvider } from "react-native-elements";
import moment from "moment";

export default class Insats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      boende: firebase.auth().currentUser.uid,
      insats: props.insats,
      navigation: props.navigation,
      scrollOfsetY: props.scrollOfsetY,
      modalVisible: false,
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { message, id } = this.state;
    const { modalVisible } = this.state;

    return (
      <Animated.View>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalText}>
                  <Text style={{ fontSize: 22 }}>{message}!</Text>
                  <Text style={{ fontSize: 17 }}>
                    Från: {this.state.insats.fromTime} - Till:{" "}
                    {this.state.insats.toTime}!
                  </Text>
                  <Text style={{ fontSize: 17 }}>
                    Datum: {this.state.insats.date}!
                  </Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}> Dölj </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.instatsList, styles.instatsList]}
            onPress={() => this.setModalVisible(true)}
          >
            <Text key={this.state.id}>{message}</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  instatsList: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 22,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 2,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 8,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ff8c00",
    borderRadius: 10,
    padding: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      zIndex: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
