import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Content, Item, Input, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle'

export default class TextInput extends Component {
  render() {
    return (
      <Content style={ globStyle.whiteFill }>
        <Item>
          <Icon active name={this.props.icon} type='MaterialIcons' style={ globStyle.orangeCrayola }/>
          <Input placeholder= {this.props.placeholder} onChangeText={(text) => {this.props.updateField({text, field: this.props.placeholder})}}/>
        </Item>
      </Content>
    );
  }
}
