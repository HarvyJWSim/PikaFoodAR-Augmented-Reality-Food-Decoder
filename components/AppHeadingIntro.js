import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'

export default class AppHeadingIntro extends React.Component {
    render() {
      return (
        <View style={ [globStyle.topContainer, globStyle.charcoalFill, {height: 300}] }>
          <Animatable.Text
            style={ [globStyle.deepLemon, {marginTop: 35}, {fontSize: 50}, {fontFamily: 'pokemon-solid'}, {letterSpacing: 8}, {textAlign: 'center'}] }
            animation="pulse"
            iterationCount="infinite">
            PIKA
            <Text style={ [{fontSize: 45}, {fontFamily: 'pokemon-hollow'}] }>Food</Text>
            <Text style={ [{fontSize: 20}] }> </Text>
            <Text style={ [globStyle.orangeCrayola, {fontSize: 30}, {fontFamily: 'righteous'}, {letterSpacing: 0}] }>AR</Text>
          </Animatable.Text>
          <Animatable.Image
            source= {this.props.image}
            style={ [ {resizeMode: 'contain'}, {position: 'relative'}, this.props.imageStyle] }
            animation= {this.props.imageAnimation}
            iterationCount={2}
          />
        </View>
      );
    }
}
