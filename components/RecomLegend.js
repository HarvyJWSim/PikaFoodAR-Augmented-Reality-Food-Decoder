import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Content, Text, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle';

export default class AdditiveLegend extends Component {
  render() {
    return (
      <View style={[{flexDirection: 'column'}, {marginTop: 10} ]}>
        <Icon active name={this.props.icon} type='MaterialIcons' style={[ {fontSize: 18}, {marginLeft: 5}, this.props.style ]}/>
        <Text style={[ {marginTop: 3}, {flexDirection: 'row'}, {fontSize: 12}, this.props.style ]}> {this.props.category} </Text>
      </View>
    );
  }
}
