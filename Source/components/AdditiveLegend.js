import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Content, Text, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle';


export default class AdditiveLegend extends Component {
  render() {
    return (
      <View style={[{flexDirection: 'row'}, {marginTop: 10} ]}>
        <Icon active name={this.props.icon} type='MaterialIcons' style={[ globStyle.orangeCrayola, this.props.style ]}/>
        <Text style={[ globStyle.orangeCrayola, {marginTop: 3}, {flexDirection: 'row'}, this.props.textStyle ]}> {this.props.category} </Text>
      </View>
    );
  }
}
