import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Modal} from 'react-native';
import {Container, Item, Body} from 'native-base';
import AppHeadingIntro from '../components/AppHeadingIntro';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import {globStyle} from './../GlobalStyle'

const imageStyle = {
  right: 110,
  height: 280
}

export default class RegistAccScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        username: '',
        password: '',
        confirmPassword: ''
      };
      this.updateField = this.updateField.bind(this);
  }

  updateField = (inputObj) => {
      if (inputObj.field == "username") {
        this.setState({username: inputObj.text})
      }
      else if (inputObj.field == "password") {
        this.setState({password: inputObj.text})
      }
      else {
        this.setState({confirmPassword: inputObj.text})
      }
  }

  render() {
    // accountInfo = {
    //   username: this.state.username,
    //   password: this.state.password
    // }
    // const {navigate} =this.props.navigation;

    return (
      <Container>
        <AppHeadingIntro image= {require('../assets/images/Pika-Jump.png')} imageStyle= {imageStyle} imageAnimation= "bounce"/>
        <Container style={ [{zIndex: -1}, {marginTop: 100}, {width: 300}, {height: 300}, {alignSelf: 'center'}] }>
          <TextInput icon="face" placeholder="username" updateField={this.updateField}/>
          <TextInput icon="lock" placeholder="password" updateField={this.updateField}/>
          <TextInput icon="lock" placeholder="confirm password" updateField={this.updateField}/>
          <RoundButton text="Next" navigation={this.props.navigation} navigatingPage="RegistAccProfile" action="registAccount"
          field={{username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword}}/>
        </Container>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
