import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle'

export default class PickerConsumeFreq extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: undefined
      };
  }

  onValueChange(value: string) {
    this.setState({ selected: value });
    this.props.updateField({value, field: "consume frequency"})
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
                <Picker.Item label="Frequency of Consumption" value="freq" />
                <Picker.Item label="High" value="H" />
                <Picker.Item label="Medium" value="M" />
                <Picker.Item label="Low" value="L" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
