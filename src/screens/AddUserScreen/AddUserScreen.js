import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../../database/firebaseDb';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import DropdownMenu from 'react-native-dropdown-menu';


// class AddUserScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ''
//     };
//   }
  




class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('insatser');
    this.state = {
      helperName: '',
      insatsType: '',
      residentName: '',
      time: '',
      isLoading: false
    };
  }
  // time: some sort of dropdown one time for every hour 08:00 - 16:00
  // insatsType: dropdown menu
  // residentName, helperName.




  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.helperName === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        helperName: this.state.helperName,
        insatsType: this.state.insatsType,
        residentName: this.state.residentName,
        time: this.state.time,

      }).then((res) => {
        this.setState({
          helperName: '',
          insatsType: '',
          residentName: '',
          time: '',
          isLoading: false

        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {

    var data = [['städa','tvätta']];
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'helperName'}
              value={this.state.helperName}
              onChangeText={(val) => this.inputValueUpdate(val, 'helperName')}
          />
        </View>

        <View style={{flex: 1}}>
          <View style={{height: 64}} />
          <DropdownMenu
            style={{flex: 1}}
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'green'}
            // arrowImg={}      
            // checkImage={}   
            // optionTextStyle={{color: '#333333'}}
            // titleStyle={{color: '#333333'}} 
            // maxHeight={300} 
            value={(selection, row) => this.setState({insatsType: data[selection][row]})}
            data={data}
            onChangeText={(data) => this.inputValueUpdate(this.data, 'insatsType')}
          >
          </DropdownMenu>
        </View>


        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'residentName'}
              value={this.state.residentName}
              onChangeText={(val) => this.inputValueUpdate(val, 'residentName')}
          />
        </View>


        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'time'}
              value={this.state.time}
              onChangeText={(val) => this.inputValueUpdate(val, 'time')}
          />
        </View>


        <View style={styles.button}>
          <Button
            title='Add User'
            onPress={() => this.storeUser()} 
            color="#19AC52"
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
    minHeight: 128,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddUserScreen;