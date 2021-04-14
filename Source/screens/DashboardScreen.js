import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {Container, Item, Body, Fab, Icon} from 'native-base';
import AppHeading from '../components/AppHeading';
import TextInput from '../components/TextInput';
import AdditiveLegend from '../components/AdditiveLegend';
import RecomLegend from '../components/RecomLegend';
import RoundButton from '../components/RoundButton';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'
import Modal from "react-native-modal";

const addtStyle = {
  fontSize: 60
};

const addtTxtStyle = {
  fontSize: 15
};

export default class DashboardScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      this.state =
      {
        legendModalActive: false,
        diseModalActive: false,
        isLegendModalVisible: false,
        isDiseModalVisible: false
      };
  }

  showLegendHelp = () => {
    this.setState({ isLegendModalVisible: true });
  }

  closeLegendModal = () => {
    this.setState({ isLegendModalVisible: false });
  }

  showDiseHelp = () => {
    this.setState({ isDiseModalVisible: true });
  }

  closeDiseModal = () => {
    this.setState({ isDiseModalVisible: false });
  }

  render() {
    var addtStyle = [ globStyle.orangeCrayola, {fontSize: 25} ];
    return (
      <Container>
        <AppHeading/>
        <Container style={[ {zIndex: -1}, {marginTop: 5} ]}>
          <View style={[ {flex: 1}, {flexDirection: 'row'}, {justifyContent: 'space-evenly'} ]}>
            <View style={[ globStyle.uclaBlueFill, {height: 250}, {width: 180}, {borderRadius: 10}, {borderColor: "#FAD61F"}, {borderWidth: 3} ]}>
              <View style={[ {height: 230}, {width: 160}, {flex: 1}, {justifyContent: 'center'}, {marginLeft: 7} ]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoricalEval')} style={[ {flex: 1}, {justifyContent: 'center'}, {marginLeft: 7} ]}>
                  <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.antiFlashWhite, {fontSize: 20} ]}>
                    Historical Food Label Evaluations
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[ globStyle.charcoalFill, {height: 250}, {width: 180}, {borderRadius: 10}, {borderColor: "#FAD61F"}, {borderWidth: 3} ]}>
              <View style={[ {height: 230}, {width: 160}, {flex: 1}, {justifyContent: 'center'}, {marginLeft: 7} ]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateHealth')} style={[ {flex: 1}, {justifyContent: 'center'}, {marginLeft: 7} ]}>
                  <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.antiFlashWhite, {fontSize: 20} ]}>
                    Health Profiling
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[ {flex: 1}, {flexDirection: 'row'}, {justifyContent: 'space-evenly'}, {height: 250}, globStyle.orangeCrayolaFill, {borderRadius: 10}, {borderColor: "#FAD61F"}, {borderWidth: 3}  ]}>
            <Animatable.Image
              source= {require('../assets/images/Pika-Icon.png')}
              style={[ {alignSelf: 'center'}, {height: 150}, {width: 150} ]}
              animation="wobble"
              iterationCount="2"
            />
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AugmentedReality')} style={[ {flex: 1}, {justifyContent: 'center'}, {marginLeft: 7} ]}>
              <Text style={[ {textAlign: 'center'}, {fontFamily: 'pokemon-solid'}, globStyle.darkGunmetal, {fontSize: 22}, {letterSpacing: 6} ]}>
                Augmented Reality Mode
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
        <Fab
          active={this.state.legendModalActive}
          style={ globStyle.charcoalFill }
          position="bottomRight"
          onPress={this.showLegendHelp}>
          <Icon name="help" type="MaterialIcons"/>
        </Fab>
        <Modal isVisible={this.state.isLegendModalVisible} onBackButtonPress={this.closeLegendModal}>
          <View style={[ { flex: 1 }, {marginTop: 40}, {marginLeft: 40}, {marginRight: 40} ]}>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 15}, {fontFamily: 'righteous'}, {textAlign: 'center'} ]}>
              Legend - Additives
            </Text>
            <AdditiveLegend category="Safe" icon="check-circle" style={addtStyle} textStyle={addtTxtStyle}/>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 12}, {fontFamily: 'nunito'}, {fontWeight: 'bold'}, {textAlign: 'center'} ]}>
              Appears to be safe.
            </Text>

            <AdditiveLegend category="Caution" icon="error" style={addtStyle} textStyle={addtTxtStyle}/>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 12}, {fontFamily: 'nunito'}, {fontWeight: 'bold'}, {textAlign: 'center'} ]}>
              May pose a risk and needs to be better tested. Try to avoid.
            </Text>

            <AdditiveLegend category="Cut Back" icon="content-cut" style={addtStyle} textStyle={addtTxtStyle}/>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 12}, {fontFamily: 'nunito'}, {fontWeight: 'bold'}, {textAlign: 'center'} ]}>
              Not toxic, but large amounts may be unsafe or promote bad nutrition.
            </Text>

            <AdditiveLegend category="Avoid" icon="do-not-disturb-alt" style={addtStyle} textStyle={addtTxtStyle}/>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 12}, {fontFamily: 'nunito'}, {fontWeight: 'bold'}, {textAlign: 'center'} ]}>
              Unsafe in amounts consumed or is very poorly tested and not worth any risk.
            </Text>

            <AdditiveLegend category="Banned" icon="cancel" style={addtStyle} textStyle={addtTxtStyle}/>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 12}, {fontFamily: 'nunito'}, {fontWeight: 'bold'}, {textAlign: 'center'} ]}>
              History of food additives is riddled with additives that, after many years of use, were found to pose health risks and banned.
            </Text>
            <View style={ {marginTop: 20} }></View>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 15}, {fontFamily: 'righteous'}, {textAlign: 'center'} ]}>
              Legend - Diet-disease Relationship
            </Text>

            <RecomLegend style={globStyle.malachite} category="Recommended" icon="check-box-outline-blank"/>
            <RecomLegend style={globStyle.deepLemon} category="To Limit" icon="check-box-outline-blank"/>
            <RecomLegend style={globStyle.red} category="To Prevent" icon="check-box-outline-blank"/>
          </View>
        </Modal>
        <Fab
          active={this.state.diseModalActive}
          style={[ globStyle.charcoalFill, {position: 'relative'}, {right: 56} ]}
          position="bottomRight"
          onPress={this.showDiseHelp}>
          <Icon name="info" type="MaterialIcons"/>
        </Fab>
        <Modal isVisible={this.state.isDiseModalVisible} onBackButtonPress={this.closeDiseModal}>
          <View style={[ { flex: 1 }, {marginTop: 40}, {marginLeft: 40}, {marginRight: 40}, {height: 300} ]}>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 15}, {fontFamily: 'righteous'}, {textAlign: 'center'} ]}>
              Diseases
            </Text>
            <Image
              source= {require('../assets/images/HelpDiseList.png')}
              style={ [ {resizeMode: 'contain'}, {height: 560}, {position: 'relative'}, {top: 27}, {right: 995} ]}
            />
          </View>
        </Modal>
      </Container>
    );
  }

}

const styles = StyleSheet.create({

});
