import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Modal} from 'react-native';
import {Container, Item, Body} from 'native-base';
import AppHeadingIntro from '../components/AppHeadingIntro';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import PickerGender from '../components/PickerGender';
import PickerAge from '../components/PickerAge';
import PickerCountry from '../components/PickerCountry';
import {globStyle} from './../GlobalStyle'

const imageStyle = {
  right: 190,
  height: 200
}

export default class RegistAccScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        email: '',
        gender: '',
        age: '',
        country: '',
        occupation: '',
      };
      this.updateField = this.updateField.bind(this);
  }

  updateField = (inputObj) => {
      if (inputObj.field == "email") {
        this.setState({email: inputObj.text})
      }
      else if (inputObj.field == "gender") {
        if (inputObj.value == "male")
          this.setState({gender: 'M'})
        else
          this.setState({gender: 'F'})
      }
      else if (inputObj.field == "age") {
        this.setState({age: inputObj.value})
      }
      else if (inputObj.field == "country") {
        this.setState({country: inputObj.value})
      }
      else {
        this.setState({occupation: inputObj.text})
      }
  }

  render() {
    const username = this.props.navigation.getParam('username');
    const password = this.props.navigation.getParam('password');

    return (
      <Container>
      <AppHeadingIntro image= {require('../assets/images/Pika-Fly.png')} imageStyle= {imageStyle} imageAnimation= "swing"/>
        <Container style={ [{zIndex: -1}, {marginTop: 35}, {width: 300}, {height: 300}, {alignSelf: 'center'}] }>
          <TextInput icon="face" placeholder="email" updateField={this.updateField}/>
          <PickerGender updateField={this.updateField}/>
          <PickerAge updateField={this.updateField}/>
          <PickerCountry updateField={this.updateField}/>
          <TextInput icon="face" placeholder="occupation" updateField={this.updateField}/>
          <RoundButton text="Register" navigation={this.props.navigation} navigatingPage="RegistAccHealth" action="registProfile"
            field={{ username, password, email: this.state.email, gender: this.state.gender, age: this.state.age, country: this.state.country, occupation: this.state.occupation }}/>
        </Container>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
