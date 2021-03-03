import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../../database/firebaseDb';
import DropdownMenu from 'react-native-dropdown-menu';
import CalendarPicker from 'react-native-calendar-picker';


class AddInsatsScreen extends Component {
  constructor(props) {
    super();
    this.dbRef = firebase.firestore().collection('insatser');
    this.state = {
      helperName: '',
      insatsType: 'Fritext',
      residentName: '',
      time: '',
      date: '',
      freeText: '',
      isLoading: false
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date.toJSON().substring(0,10),
    });
    this.inputValueUpdate(date.toJSON().substring(0,10), 'date');
  }

  storeInsats() {
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
        date: this.state.date,
        freeText : this.state.freeText,

      }).then((res) => {
        this.setState({
          helperName: '',
          insatsType: '',
          residentName: '',
          time: '',
          date: '',
          freeText: '',
          isLoading: false

        });
        this.props.navigation.navigate('HomeScreen')
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

    var data = [['Fritext', 'Städa','Tvätta', 'Handla', 'Duscha']];
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
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

        <View style={styles.inputGroup}>
          <TextInput
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
        
        <View style={styles.inputGroup}>
          <CalendarPicker
            onDateChange={this.onDateChange}
            
          />

          <View>
            <Text>SELECTED DATE:{ startDate }</Text>
          </View>
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
              placeholder={'Fritext...'}
              value={this.state.freeText}
              onChangeText={(val) => this.inputValueUpdate(val, 'freeText')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Spara Insats'
            onPress={() => this.storeInsats()} 
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
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Dropdown: {
    flex: 1,
    marginBottom: 250,
  },
  button: {
    flex: 1,
    padding: 0,
    marginBottom: 40,
    borderBottomWidth: 1,

  },
})

export default AddInsatsScreen;