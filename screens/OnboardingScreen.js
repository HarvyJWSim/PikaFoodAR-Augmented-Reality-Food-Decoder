import React from 'react';
import {Image, Text, View} from 'react-native';
import { Container } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'

const slides = [
  {
    key: '1',
    title: 'Compare Product Brands?',
    text: 'Revolutionise and Improve Food Products Purchase Decision Together with Pikachu',
    contentImage: require('../assets/images/Onboard-Food-Purchase.png'),
    animImage: require('../assets/images/Pika-Stand.png'),
    animType: "bounce",
    animImageStyle: [ {resizeMode: 'contain'}, {height: 170}, {position: 'relative'}, {bottom: 75}, {right: 700} ],
    backgroundColor: '#59b2ab',
    sliderStyle: [globStyle.topContainer, globStyle.darkGunmetalFill, {flex: 2}, {flexDirection: 'column'}, {justifyContent: 'space-evenly'}, {width: 360}],
    titleStyle: [ globStyle.antiFlashWhite, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'pokemon-solid'}, {fontSize: 19}, {letterSpacing: 4}, {marginTop: 80}, {marginLeft: 4}, {marginRight: 4} ],
    descStyle: [ globStyle.deepLemon, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'alegreya-sans'}, {fontSize: 22}, {marginLeft: 18}, {marginRight: 18}, {marginBottom: 25} ]
  },
  {
    key: '2',
    title: 'Integrated Information',
    text: 'Information Integrated from Up to 6 Countries and 9 Organisations',
    contentImage: require('../assets/images/Onboard-Countries-Org.png'),
    animImage: require('../assets/images/Pika-Stand.png'),
    animType: "bounce",
    animImageStyle: [ {resizeMode: 'contain'}, {height: 170}, {position: 'relative'}, {bottom: 75}, {right: 700} ],
    backgroundColor: '#59b2ab',
    sliderStyle: [globStyle.topContainer, globStyle.charcoalFill, {flex: 2}, {flexDirection: 'column'}, {justifyContent: 'space-evenly'}, {width: 360}],
    titleStyle: [ globStyle.antiFlashWhite, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'pokemon-solid'}, {fontSize: 19}, {letterSpacing: 4}, {marginTop: 80}, {marginLeft: 4}, {marginRight: 4} ],
    descStyle: [ globStyle.deepLemon, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'alegreya-sans'}, {fontSize: 22}, {marginLeft: 18}, {marginRight: 18}, {marginBottom: 25} ]
  },
  {
    key: '3',
    title: 'Interactive App',
    text: 'Utilise Augmented Reality to Display Food Product Risk in Real Environment',
    contentImage: require('../assets/images/Onboard-AR.png'),
    animImage: require('../assets/images/Pika-Stand.png'),
    animType: "bounce",
    animImageStyle: [ {resizeMode: 'contain'}, {height: 170}, {position: 'relative'}, {bottom: 75}, {right: 700} ],
    backgroundColor: '#59b2ab',
    sliderStyle: [globStyle.topContainer, globStyle.deepLemonFill, {flex: 2}, {flexDirection: 'column'}, {justifyContent: 'space-evenly'}, {width: 360}],
    titleStyle: [ globStyle.darkGunmetal, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'pokemon-solid'}, {fontSize: 19}, {letterSpacing: 4}, {marginTop: 80}, {marginLeft: 4}, {marginRight: 4} ],
    descStyle: [ globStyle.darkGunmetal, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'alegreya-sans'}, {fontSize: 22}, {marginLeft: 18}, {marginRight: 18}, {marginBottom: 25} ]
  },
  {
    key: '4',
    title: 'Personalised Evaluation',
    text: "Display Personalised Risk Score based on User's Current Health Risk",
    contentImage: require('../assets/images/Onboard-Risk-Score.png'),
    animImage: require('../assets/images/Pika-Stand.png'),
    animType: "bounce",
    animImageStyle: [ {resizeMode: 'contain'}, {height: 170}, {position: 'relative'}, {bottom: 75}, {right: 700} ],
    backgroundColor: '#59b2ab',
    sliderStyle: [globStyle.topContainer, globStyle.orangeCrayolaFill, {flex: 2}, {flexDirection: 'column'}, {justifyContent: 'space-evenly'}, {width: 360}],
    titleStyle: [ globStyle.darkGunmetal, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'pokemon-solid'}, {fontSize: 19}, {letterSpacing: 4}, {marginTop: 80}, {marginLeft: 4}, {marginRight: 4} ],
    descStyle: [ globStyle.darkGunmetal, {flex: 2}, {textAlign: 'center'}, {fontFamily: 'alegreya-sans'}, {fontSize: 22}, {marginLeft: 18}, {marginRight: 18}, {marginBottom: 25} ]
  }
];

export default class OnboardingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        showRealApp: false
      };
  }

  renderItem = (item) => {
    return (
      <View style={item.sliderStyle}>
        <Text style={item.titleStyle}>{item.title}</Text>
        <Animatable.Image
          source= {item.animImage}
          style={item.animImageStyle}
          animation={item.animType}
          iterationCount="infinite"
        />
        <Image source={item.contentImage} style={[ {flex: 3}, {height: undefined}, {width: undefined}, {resizeMode: 'contain'}, {marginBottom: 30} ]}>
        </Image>
        <Text style={item.descStyle}>{item.text}</Text>
      </View>
    );
  }
  onDone = () => {
    this.props.navigation.navigate('Home');
  }
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider renderItem={this.renderItem} slides={slides} onDone={this.onDone} showSkipButton='true' onSkip={this.onDone}/>;
    }
  }
}
