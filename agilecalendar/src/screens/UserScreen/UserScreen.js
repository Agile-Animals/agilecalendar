import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import firebase from "../../database/firebaseDb";
import { Button, List, ListItem } from "@ui-kitten/components";

class UserScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("insatser");
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { residentName, time, helperName, insatsType } = res.data();
      userArr.push({
        key: res.id,
        res,
        residentName,
        time,
        helperName,
        insatsType,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View>
        <Button style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("AddUserScreen");
          }}
        >
          Ny Insats
        </Button>
        {this.state.userArr.map((item, index) => (
          <View key={index}>
            <Text>{item.residentName}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

export default UserScreen;
