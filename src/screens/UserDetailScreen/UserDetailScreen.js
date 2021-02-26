import React, { Component } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import firebase from "../../database/firebaseDb";
import DropdownMenu from 'react-native-dropdown-menu';

class UserDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      residentName: "",
      time: "",
      helperName: "",
      insatsType: "",
      freeText: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.props.route.params.userkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          residentName: user.residentName,
          time: user.time,
          helperName: user.helperName,
          insatsType: user.insatsType,
          freeText: user.freeText,
          isLoading: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.state.key);
    updateDBRef
      .set({
        residentName: this.state.residentName,
        time: this.state.time,
        helperName: this.state.helperName,
        insatsType: this.state.insatsType,
        freeText: this.state.freeText,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          residentName: "",
          time: "",
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

  deleteUser() {
    const dbRef = firebase
      .firestore()
      .collection("insatser")
      .doc(this.props.route.params.userkey);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
      this.props.navigation.navigate("HomeScreen");
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteUser() },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    var data = [['Fritext', 'Städa','Tvätta']];

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
            placeholder={"helperName"}
            value={this.state.helperName}
            onChangeText={(val) => this.inputValueUpdate(val, "helperName")}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"residentName"}
            value={this.state.residentName}
            onChangeText={(val) => this.inputValueUpdate(val, "residentName")}
          />
        </View>


        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"time"}
            value={this.state.time}
            onChangeText={(val) => this.inputValueUpdate(val, "time")}
          />
        </View>

        <View style={styles.Dropdown}>
          <View style={{height: 64}} />
          <DropdownMenu
            style={{flex: 1, marginBottom: 95,}}
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'green'}
            // arrowImg={}      
            // checkImage={}   
            // optionTextStyle={{color: '#333333'}}
            // titleStyle={{color: '#333333'}} 
            // maxHeight={300} 
            handler={(selection, row) => this.setState({insatsType: data[selection][row]})}
            data={data}
          >
          </DropdownMenu>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              placeholder={this.state.freeText}
              value={this.state.freeText}
              onChangeText={(val) => this.inputValueUpdate(val, 'freeText')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Update"
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title="Delete"
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  button: {
    marginBottom: 7,
  },
  Dropdown: {
    flex: 1,
    marginBottom: 250,
  }
});

export default UserDetailScreen;