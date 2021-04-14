import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'

export default class AppHeading extends React.Component {
    render() {
      return (
        <View style={ [globStyle.topContainer, globStyle.darkGunmetalFill, {height: 150}] }>
          <Animatable.Text
            style={ [globStyle.deepLemon, {marginTop: 35}, {fontSize: 50}, {fontFamily: 'pokemon-solid'}, {letterSpacing: 8}, {textAlign: 'center'}] }
            animation="bounceInDown"
            iterationCount="1">
            PIKA
            <Text style={ [{fontSize: 45}, {fontFamily: 'pokemon-hollow'}] }>Food</Text>
            <Text style={ [{fontSize: 20}] }> </Text>
            <Text style={ [globStyle.orangeCrayola, {fontSize: 30}, {fontFamily: 'righteous'}, {letterSpacing: 0}] }>AR</Text>
          </Animatable.Text>
          <Animatable.Image
            source= {require('../assets/images/Pika-Sleep.png')}
            style={ [ {resizeMode: 'contain'}, {height: 120}, {position: 'relative'}, {bottom: 20}, {right: 920} ]}
            animation="fadeInRightBig"
            iterationCount="1"
          />
        </View>
      );
    }
}
