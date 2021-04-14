import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform, StatusBar, View, Text, Image } from 'react-native';
import { Root } from 'native-base'
import {globalVar} from './GlobalVar'
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {globStyle} from './GlobalStyle'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    showRealApp: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    else {

        return (
          <Root>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </Root>
        );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/Pika-Fly.png'),
        require('./assets/images/Pika-Icon.png'),
        require('./assets/images/Pika-Jump.png'),
        require('./assets/images/Pika-Jump2.png'),
        require('./assets/images/Pika-Sit.png'),
        require('./assets/images/Pika-Sleep.png'),
        require('./assets/images/Pika-Stand.png'),
        require('./assets/images/Cancer.png'),
        require('./assets/images/Dementias-Alzheimer.png'),
        require('./assets/images/Diabetes.png'),
        require('./assets/images/Diarrhoeal.png'),
        require('./assets/images/Ischaemic-Heart.png'),
        require('./assets/images/Respiratory-Infections.png'),
        require('./assets/images/Stroke.png'),
        require('./assets/images/united-kingdom.png'),
        require('./assets/images/united-states.png'),
        require('./assets/images/new-zealand.png'),
        require('./assets/images/canada.png'),
        require('./assets/images/japan.png'),
        require('./assets/images/Onboard-Food-Purchase.png'),
        require('./assets/images/Onboard-Countries-Org.png'),
        require('./assets/images/Onboard-AR.png'),
        require('./assets/images/Onboard-Risk-Score.png'),
        require('./assets/images/HelpDiseList.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'pokemon-solid': require('./assets/fonts/Pokemon-Solid.ttf'),
        'pokemon-hollow': require('./assets/fonts/Pokemon-Hollow.ttf'),
        'alegreya': require('./assets/fonts/Alegreya-Regular.ttf'),
        'alegreya-sans': require('./assets/fonts/AlegreyaSans-Regular.ttf'),
        'nunito': require('./assets/fonts/Nunito-Light.ttf'),
        'righteous': require('./assets/fonts/Righteous-Regular.ttf'),
        'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
