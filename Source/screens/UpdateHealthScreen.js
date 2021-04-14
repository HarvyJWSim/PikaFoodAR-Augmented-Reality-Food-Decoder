import React from 'react';
import {Image, ScrollView, StyleSheet, Modal} from 'react-native';
import {Container, Content, Item, Body, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Icon, Toast} from 'native-base';
import AppHeadingIntro from '../components/AppHeadingIntro';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import {globStyle} from './../GlobalStyle'

const imageStyle = {
  right: 190,
  height: 200
}

const cards = [
  {
    id: '10',
    text: 'Ischaemic Heart',
    image: require('../assets/images/Ischaemic-Heart.png'),
  },
  {
    id: '11',
    text: 'Stroke',
    image: require('../assets/images/Stroke.png'),
  },
  {
    id: '12',
    text: 'Respiratory Infections',
    image: require('../assets/images/Respiratory-Infections.png'),
  },
  {
    id: '13',
    text: "Dementias/Alzheimer's",
    image: require('../assets/images/Dementias-Alzheimer.png'),
  },
  {
    id: '14',
    text: 'Trachea/Bronchus/Lung Cancer',
    image: require('../assets/images/Cancer.png'),
  },
  {
    id: '15',
    text: 'Diabetes Mellitus',
    image: require('../assets/images/Diabetes.png'),
  },
  {
    id: '16',
    text: 'Diarrhoeal',
    image: require('../assets/images/Diarrhoeal.png'),
  }
]

export default class UpdateHealthScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        diseaseList: [],
      };
  }

  storeDiseaseList = (index) => {
    let diseaseList = this.state.diseaseList;
    diseaseList.push(index.id);
    this.setState({
      diseaseList: diseaseList
    });
  }

  saveDiseaseList = () => {
    let serverUrl = "http://" + global.address + "/pikafoodar/update-diseases.php";
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: global.userId,
          diseaseList: this.state.diseaseList,
        })
    }).then((response) => response.json()).then((responseJson) => {
      if(responseJson.message == "Diseases list saved") {
        global.diseList = this.state.diseaseList;
        Toast.show({
          text: responseJson.message,
          textStyle: { fontFamily: 'alegreya', color: '#FAD61F' } ,
          buttonText: 'OKAY',
          buttonTextStyle: { fontFamily: 'alegreya', color: '#1C2331' },
          buttonStyle: { backgroundColor: '#FF7733' }
        });
        this.props.navigation.navigate('Dashboard');
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
  render() {
    return (
      <Container>
        <AppHeadingIntro image= {require('../assets/images/Pika-Jump.png')} imageStyle= {imageStyle} imageAnimation= "swing"/>
      <Container style={ [{zIndex: -1}, {marginTop: 25}, {width: 300}, {height: 300}, {alignSelf: 'center'}] }>
          <View>
            <DeckSwiper
              dataSource={cards}
              looping={false}
              renderEmpty={() =>
                <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 15}, {fontWeight: '500'}, {textAlign: 'center'}] }
                      onPress={this.saveDiseaseList}>
                  Health Profile Updated! Click here to continue.
                </Text>
              }
              onSwipeLeft = {this.storeDiseaseList}
              renderItem=
              {
                item =>
                <Card style={{ elevation: 2 }}>
                  <CardItem style={ globStyle.orangeCrayolaFill }>
                    <Left>
                      <Thumbnail source={item.image} />
                      <Body>
                        <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 18}, {fontWeight: '500'}] }>{item.text}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image style={{ height: 120, flex: 1 }} source={item.image} />
                  </CardItem>
                  <CardItem style={ globStyle.antiFlashWhiteFill }>
                    <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 15}, {fontWeight: '300'}, {textAlign: 'center'}] }>
                      Currently I
                      <Text style={ {fontWeight: '500'} }>
                        {" "}have{" "}
                        <Text style={ globStyle.orangeCrayola }>
                          {item.text}
                        </Text>
                      </Text>
                      {" "}at risk or in concern:
                      <Icon active name='arrow-back' type='MaterialIcons' style={ globStyle.orangeCrayola }/>
                      <Text style={ {fontWeight: '500'} }>
                        Swipe Left
                      </Text>
                    </Text>
                  </CardItem>
                  <CardItem style={ [{flexDirection: 'row'}, {justifyContent: 'center'}, globStyle.antiFlashWhiteFill] }>
                    <Text style={ [globStyle.darkGunmetal, {fontFamily: 'alegreya-sans'}, {fontSize: 15}, {fontWeight: '300'}, {textAlign: 'center'}] }>
                      If not
                      <Icon active name='arrow-forward' type='MaterialIcons' style={ globStyle.orangeCrayola }/>
                      <Text style={ {fontWeight: '500'} }>
                        Swipe Right
                      </Text>
                    </Text>
                  </CardItem>
                </Card>
              }
            />
          </View>
        </Container>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
