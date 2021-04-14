import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Image, Toast } from 'native-base';
import {globStyle} from './../GlobalStyle'
import FormData from 'FormData'

export default class RoundButton extends Component {
  constructor(props) {
      super(props);
      this.state =
      {
        hidden: false
      };
  }

  buttonPressEvent = () => {
    if (this.props.action == "logIn") {
      this.setState({
        hidden: true
      });
      if (this.props.field.username == "" || this.props.field.password == "") {
        Toast.show({
          text: 'Some fields are left empty. Kindly update the empty fields.',
          textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
          buttonText: 'OKAY',
          buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
          buttonStyle: { backgroundColor: '#FF7733' }
        });
      }
      else {
        let serverUrl = "http://" + global.address + "/pikafoodar/login.php";
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.field.username,
                password: this.props.field.password
            })
        }).then((response) => response.json()).then((responseJson) => {
          if (responseJson.hasOwnProperty("message")) {
            Toast.show({
              text: responseJson.message,
              textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
              buttonText: 'OKAY',
              buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
              buttonStyle: { backgroundColor: '#FF7733' }
            });
          }
          else {
            if (!(responseJson.hasOwnProperty("userId"))) {
              let diseList = [];
              let diseListLen = responseJson.length;
              for (var i = 0; i < diseListLen; i++) {
                diseList.push(responseJson[i].DISE_ID)
              }
              global.diseList = diseList;
              global.userId = responseJson[0].USER_ID;
            }
            else
              global.userId = responseJson.userId;

            Toast.show({
              text: "Login Successful!",
              textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
              buttonText: 'OKAY',
              buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
              buttonStyle: { backgroundColor: '#FF7733' }
            });
            this.props.navigation.navigate(this.props.navigatingPage);
        }
        }).catch((error) => {
            console.log("error");
        });
      }

    }

    else if (this.props.action == "registAccount") {
      if (this.props.field.username == "" || this.props.field.password == "") {
        Toast.show({
          text: 'Some fields are left empty. Kindly update the empty fields.',
          textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
          buttonText: 'OKAY',
          buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
          buttonStyle: { backgroundColor: '#FF7733' }
        });
      }
      else if (this.props.field.password != this.props.field.confirmPassword) {
        Toast.show({
          text: 'Unmatching password provided. Kindly check your password again.',
          textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
          buttonText: 'OKAY',
          buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
          buttonStyle: { backgroundColor: '#FF7733' }
        });
      }
      else if (!(this.props.field.password.length >= 6 && /[a-z]/.test(this.props.field.password) && /[A-Z]/.test(this.props.field.password) &&
               /\d/.test(this.props.field.password) && /[!@#$%^&*(),.?":{}|<>]/.test(this.props.field.password))) {
         Toast.show({
           text: 'Password must be made up of at least 6 alphanumeric characters (inclusive of lower case and upper case) and special characters.',
           textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
           buttonText: 'OKAY',
           buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
           buttonStyle: { backgroundColor: '#FF7733' }
         });
      }
      else {
        let serverUrl = "http://" + global.address + "/pikafoodar/verify-username.php";
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.field.username
            })
        }).then((response) => response.json()).then((responseJson) => {
        if(responseJson.message == "Username available") {
        this.props.navigation.navigate(this.props.navigatingPage, {
            username: this.props.field.username,
            password: this.props.field.password
          });
        }
        else {
          Toast.show({
            text: responseJson.message,
            textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
            buttonText: 'OKAY',
            buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
            buttonStyle: { backgroundColor: '#FF7733' }
          });
        }
        }).catch((error) => {
            console.log("error");
        });
      }
    }

    else if (this.props.action == "registProfile") {
      if (this.props.field.email == "" || this.props.field.gender == "" || this.props.field.age == "" || this.props.field.country == "" || this.props.field.occupation == "") {
        Toast.show({
          text: 'Some fields are left empty. Kindly update the empty fields.',
          textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
          buttonText: 'OKAY',
          buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
          buttonStyle: { backgroundColor: '#FF7733' }
        });
      }
      else {
        let serverUrl = "http://" + global.address + "/pikafoodar/.php";
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.props.field.username,
              password: this.props.field.password,
              email: this.props.field.email,
              gender: this.props.field.gender,
              age: this.props.field.age,
              country: this.props.field.country,
              occupation: this.props.field.occupation,
            })
        }).then((response) => response.json()).then((responseJson) => {
          if(responseJson[0].hasOwnProperty("LAST_INSERT_ID()")) {
            global.userId = responseJson[0]["LAST_INSERT_ID()"];
            Toast.show({
              text: "Registration successful!",
              textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
              buttonText: 'OKAY',
              buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
              buttonStyle: { backgroundColor: '#FF7733' }
            });
            this.props.navigation.navigate(this.props.navigatingPage);
          }
          else {
            Toast.show({
              text: responseJson.message,
              textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
              buttonText: 'OKAY',
              buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
              buttonStyle: { backgroundColor: '#FF7733' }
            });
          }
        }).catch((error) => {
            console.log(error);
            console.log("error");
        });
      }
    }
    else if (this.props.action == "saveEval") {
      var ingdIdList = this.props.field.ingdIdList;
      var now = new Date();
      var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      var time = now.getHours() + ':' + now.getMinutes();
      console.log(global.userId);
      let serverUrl = "http://" + global.address + "/pikafoodar/save-product.php";
      fetch(serverUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            labelName: this.props.field.productName,
            freqCons: this.props.field.consumeFreq,
            addtScore: this.props.field.addtEvalScore,
            dietDiseScore: this.props.field.dietDiseEvalScore,
            userId: global.userId,
            date: date,
            time: time
          })
      }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        if(responseJson[0].hasOwnProperty("LABEL_ID")) {
          var labelId = responseJson[0]["LABEL_ID"];
          console.log(labelId + "FROM RESPONSE");
          //
          ingdIdList.map((ingdId) => {
            console.log("LABELID ACTUALLY IS " +labelId)
            let serverUrl = "http://" + global.address + "/pikafoodar/save-product-label.php";
            fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  labelId: labelId,
                  ingdId: ingdId
                })
            }).then((response) => response.json()).then((responseJson) => {
              console.log(responseJson);
              // if (responseJson.message == 'Product label saved') {
              // }
              // else {
              // }
            }).catch((error) => {
                console.log(error);
                console.log("error");
            });
          });
          Toast.show({
            text: "Product Save Successful!",
            textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
            buttonText: 'OKAY',
            buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
            buttonStyle: { backgroundColor: '#FF7733' }
          });
          //
        }
        else {
          Toast.show({
            text: responseJson.message,
            textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
            buttonText: 'OKAY',
            buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
            buttonStyle: { backgroundColor: '#FF7733' }
          });
        }
      }).catch((error) => {
          console.log(error);
          console.log("error");
      });
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Button rounded style={ globStyle.charcoalFill } onPress={this.buttonPressEvent}>
            <Text style={ [globStyle.deepLemon, {fontFamily: 'pokemon-solid'}, {letterSpacing: 2}] }>{this.props.text}</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
