import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Picker, Icon } from 'native-base';
import {globStyle} from './../GlobalStyle'

export default class PickerAge extends Component {
  constructor(props) {
      super(props);
      this.state = {
        selected: undefined
      };
  }

  onValueChange(value: string) {
    this.setState({ selected: value });
    this.props.updateField({value, field: "age"})
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
                <Picker.Item label="Age" value="age" />
                <Picker.Item label="Less than 19" value="lessThan19" />
                <Picker.Item label="19-30" value="19To30" />
                <Picker.Item label="31-50" value="31To50" />
                <Picker.Item label="51-60" value="51To60" />
                <Picker.Item label="More than 60" value="moreThan60" />
              </Picker>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
