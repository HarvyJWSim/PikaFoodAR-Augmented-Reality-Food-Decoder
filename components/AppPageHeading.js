import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'

export default class AppPageHeading extends React.Component {
    render() {
      return (
        <View style={ [globStyle.topContainer, globStyle.darkGunmetalFill, {height: 100}] }>
          <Animatable.Text
            style={ [globStyle.deepLemon, {marginTop: 35}, {fontSize: 12}, {fontFamily: 'pokemon-solid'}, {letterSpacing: 8}, {textAlign: 'center'}] }
            animation="bounceInDown"
            iterationCount="1">
            Ingredients & Additives Evaluation
          </Animatable.Text>
          <Animatable.Image
            source= {require('../assets/images/Pika-Jump2.png')}
            style={[ {resizeMode: 'contain'}, {height: 50}, {position: 'relative'}, {bottom: 87}, {right: 350} ]}
            animation="fadeInRightBig"
            iterationCount="1"
          />
        </View>
      );
    }
}
