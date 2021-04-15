import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Modal, Alert} from 'react-native';
import {Container, Item, Body} from 'native-base';
import AppHeadingIntro from '../components/AppHeadingIntro';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import {globStyle} from './../GlobalStyle'

const imageStyle = {
  right: 110,
  height: 280
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        username: '',
        password: '',
      };
      this.updateField = this.updateField.bind(this);
  }

  updateField = (inputObj) => {
      if (inputObj.field == "username") {
        this.setState({username: inputObj.text})
      }
      else {
        this.setState({password: inputObj.text})
      }
  }

  render() {
    return (
      <Container>
        <AppHeadingIntro image= {require('../assets/images/Pika-Jump.png')} imageStyle= {imageStyle} imageAnimation= "bounce"/>
        <Container style={ [{zIndex: -1}, {marginTop: 100}, {width: 300}, {height: 300}, {alignSelf: 'center'}] }>
          <TextInput icon="face" placeholder="username" updateField={this.updateField}/>
          <TextInput icon="lock" placeholder="password" updateField={this.updateField}/>
          <RoundButton text="Log In" navigation={this.props.navigation} navigatingPage="Dashboard" action="logIn"
          field={{username: this.state.username, password: this.state.password}}/>
          <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 15}, {fontWeight: '300'}, {textAlign: 'center'}] }>
            Not a PIKA Warrior yet?
          </Text>
          <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 15}, {fontWeight: '500'}, {textAlign: 'center'}] }
                onPress={() => this.props.navigation.navigate('RegistAcc')}>
            Create your PIKA Account here!
          </Text>

        </Container>
      </Container>

    );
  }

}

const styles = StyleSheet.create({

});
