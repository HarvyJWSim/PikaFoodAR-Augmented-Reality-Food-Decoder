import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle'

export default class PickerCountry extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: undefined
      };
  }

  onValueChange(value: string) {
    this.setState({ selected: value });
    this.props.updateField({value, field: "country"})
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                style={ globStyle.orangeCrayola }
              >
                <Picker.Item label="Country of Origin" value="countryOfOrigin" />
                <Picker.Item label="Malaysia" value="malaysia" />
                <Picker.Item label="Japan" value="japan" />
                <Picker.Item label="New Zealand" value="newZealand" />
                <Picker.Item label="United Kingdom" value="unitedKingdom" />
                <Picker.Item label="United States" value="unitedStates" />
                <Picker.Item label="Canada" value="canada" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
