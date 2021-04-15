import React from 'react';
import {Image, ScrollView, StyleSheet, View, Modal, Alert, TouchableOpacity} from 'react-native';
import {Item, Body, Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Right, Button} from 'native-base';
import AppHeading from '../components/AppHeading';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'

export default class HistoricalEvalScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        labelId: [],
        date: [],
        labelName: [],
        freqConsumed: [],
        addtEvalScore: [],
        dietDiseEvalScore: [],
        addtEvalScoreStyle: [],
        dietDiseEvalScoreStyle: []
      };
  }

  viewProduct = (labelId) => {
    var serverUrl = "http://" + global.address + "/pikafoodar/hist-product-label.php";
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            labelId: labelId
        })
    }).then((response) => response.json()).then((responseJson) => {
      if (!(responseJson.hasOwnProperty("message"))) {
          var responseJsonLen = responseJson.length;
          ingdId = [];
          for (var i = 0; i < responseJsonLen; i++) {
            ingdId.push(responseJson[i]["INGD_ID"]);
          }
          this.props.navigation.navigate('Evaluation', { ingdIdList: ingdId });
      }
      }).catch((error) => {
          console.log(error);
          console.log("skip");
      });
  }

  componentDidMount() {
    var labelId = [];
    var date = [];
    var labelName = [];
    var freqConsumed = [];
    var addtEvalScore = [];
    var dietDiseEvalScore = [];
    var addtEvalScoreStyle = [];
    var dietDiseEvalScoreStyle = [];

    var serverUrl = "http://" + global.address + "/pikafoodar/hist-product.php";
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: global.userId
        })
    }).then((response) => response.json()).then((responseJson) => {
      if (!(responseJson.hasOwnProperty("message"))) {
          var responseJsonLen = responseJson.length;

          for (var i = 0; i < responseJsonLen; i++) {
            labelId.push(responseJson[i]["LABEL_ID"]);
            labelName.push(responseJson[i]["LABEL_NAME"]);
            date.push(responseJson[i]["DATE"]);
            freqConsumed.push(responseJson[i]["FREQ_CONS"]);
            addtEvalScore.push(responseJson[i]["ADDT_SCORE"]);
            dietDiseEvalScore.push(responseJson[i]["DIET_DISE_SCORE"]);
          }

          var formattedDateList = [];
          var formattedFreqConsumed = [];
          var month;
          var monthString;
          var dateString;
          var day;
          var year;
          var freqConsumedChar;
          for (var j = 0; j < responseJsonLen; j++) {
            dateString = (String)(date[j]);
            year = dateString.substring(0,4);
            day = dateString.substring(8);
            switch(dateString.substring(5, 7)) {
              case '01':
                month = "Jan";
                break;
              case '02':
                month = "Feb";
                break;
              case '03':
                month = "Mac";
                break;
              case '04':
                month = "Apr";
                break;
              case '05':
                month = "May";
                break;
              case '06':
                month = "Jun";
                break;
              case '07':
                month = "Jul";
                break;
              case '08':
                month = "Aug";
                break;
              case '09':
                month = "Sep";
                break;
              case '10':
                month = "Oct";
                break;
              case '11':
                month = "Nov";
                break;
              case '12':
                month = "Dec";
          }
          formattedDateList.push(day + " " + month + " " + year);

          freqConsumedChar = freqConsumed[j];
          switch (freqConsumedChar) {
            case 'H':
              formattedFreqConsumed.push("High");
              break;
            case 'M':
              formattedFreqConsumed.push("Medium");
              break;
            case 'L':
              formattedFreqConsumed.push("Low");
              break;
          }

          if (addtEvalScore[j] <= 25)
            addtEvalScoreStyle[j] = {
              color: '#F62D13'
            }
          else if (addtEvalScore[j] <= 50)
            addtEvalScoreStyle[j] = {
              color: '#FF7733'
            }
          else if (addtEvalScore[j] <= 75)
            addtEvalScoreStyle[j] = {
              color: '#FAD61F'
            }
          else
            addtEvalScoreStyle[j] = {
              color: '#00C851'
            }

          if (dietDiseEvalScore[j] <= 25)
            dietDiseEvalScoreStyle[j] = {
              color: '#F62D13'
            }
          else if (dietDiseEvalScore[j] <= 50)
            dietDiseEvalScoreStyle[j] = {
              color: '#FF7733'
            }
          else if (dietDiseEvalScore[j] <= 75)
            dietDiseEvalScoreStyle[j] = {
              color: '#FAD61F'
            }
          else
            dietDiseEvalScoreStyle[j] = {
              color: '#00C851'
            }
        }

        this.setState(state => ({
          labelId: state.labelId.concat(labelId),
          labelName: state.labelName.concat(labelName),
          date: state.date.concat(formattedDateList),
          freqConsumed: state.freqConsumed.concat(formattedFreqConsumed),
          addtEvalScore: state.addtEvalScore.concat(addtEvalScore),
          dietDiseEvalScore: state.dietDiseEvalScore.concat(dietDiseEvalScore),
          addtEvalScoreStyle: state.addtEvalScoreStyle.concat(addtEvalScoreStyle),
          dietDiseEvalScoreStyle: state.dietDiseEvalScoreStyle.concat(dietDiseEvalScoreStyle)
        }));
      }
      }).catch((error) => {
          console.log(error);
          console.log("skip");
      });
  }

  render() {
    var date = this.state.date;
    var labelId = this.state.labelId;
    var labelName = this.state.labelName;
    var freqConsumed = this.state.freqConsumed;
    var addtEvalScore = this.state.addtEvalScore;
    var dietDiseEvalScore = this.state.dietDiseEvalScore;
    var addtEvalScoreStyle = this.state.addtEvalScoreStyle;
    var dietDiseEvalScoreStyle = this.state.dietDiseEvalScoreStyle;
    dateLen = date.length;
    var productList = [];
    for (var i = 0; i < dateLen; i++) {
      let product = {
        date: date[i],
        labelId: labelId[i],
        labelName: labelName[i],
        freqConsumed: freqConsumed[i],
        addtEvalScore: addtEvalScore[i],
        dietDiseEvalScore: dietDiseEvalScore[i],
        addtEvalScoreStyle: addtEvalScoreStyle[i],
        dietDiseEvalScoreStyle: dietDiseEvalScoreStyle[i]
      }
      productList.push(product);
    }

    return (
      <Container>
        <AppHeading/>
        <Content>
          <List>
          {productList && productList.map((product) =>
            <ListItem thumbnail>
              <Body>
                <Text style={[ {fontFamily: 'nunito'}, {fontWeight: '300'}, globStyle.orangeCrayola ]}>
                  {product.date}
                </Text>
                <Text style={[ {fontFamily: 'alegreya-sans'}, {fontWeight: '500'}, {fontSize: 17}, globStyle.charcoal ]}>
                  {product.labelName}
                </Text>
                <Text style={[ {fontFamily: 'alegreya-sans'}, {fontWeight: '300'}, {fontSize: 14}, globStyle.charcoal ]}>
                  Additive Score : {" "}
                  <Text style = {[ product.addtEvalScoreStyle, {fontSize: 23}, {fontWeight: '500'} ]}>
                    {product.addtEvalScore} %
                  </Text>
                </Text>
                <Text style={[ {fontFamily: 'alegreya-sans'}, {fontWeight: '300'}, {fontSize: 14}, globStyle.charcoal ]}>
                  Diet-disease Score : {" "}
                  <Text style = {[ product.dietDiseEvalScoreStyle, {fontSize: 23}, {fontWeight: '500'} ]}>
                    {product.dietDiseEvalScore} %
                  </Text>
                </Text>
                <Text style={[ {fontFamily: 'alegreya-sans'}, {fontWeight: '300'}, {fontSize: 12}, globStyle.charcoal ]}>
                  Frequency of consumption : {product.freqConsumed}
                </Text>
              </Body>
              <Right>
                <Animatable.View animation="flash" iterationCount="infinite">
                  <Button transparent onPress={() => this.viewProduct(product.labelId)}>
                    <Text style={[ {fontFamily: 'pokemon-solid'}, {fontWeight: '300'}, {letterSpacing: 4}, globStyle.orangeCrayola ]}>View</Text>
                  </Button>
                </Animatable.View>
              </Right>
            </ListItem>
          )}
            </List>
          </Content>
        </Container>
    );
  }

}

const styles = StyleSheet.create({

});
