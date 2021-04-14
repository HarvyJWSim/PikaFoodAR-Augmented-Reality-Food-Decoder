import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle'

export default class PickerGender extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: undefined
      };
  }

  onValueChange(value: string) {
    this.setState({ selected: value });
    this.props.updateField({value, field: "gender"})
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
                <Picker.Item label="Gender" value="gender" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
