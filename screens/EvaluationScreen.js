import React from 'react';
import {Image, ScrollView, StyleSheet, View, Alert, TouchableOpacity} from 'react-native';
import {Container, Icon, Tabs, Tab, ScrollableTab, Left, Body, Right, Title, Segment, Content, Button, Header, Card, CardItem, Thumbnail, Text, Accordion, Fab} from 'native-base';
import AppPageHeading from '../components/AppPageHeading';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import AdditiveLegend from '../components/AdditiveLegend';
import RecomLegend from '../components/RecomLegend';
import PickerConsumeFreq from '../components/PickerConsumeFreq';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'
import Modal from "react-native-modal";

const addtStyle = {
  fontSize: 60
};

const addtTxtStyle = {
  fontSize: 12
};

export default class EvaluationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
      super(props);
      const ingdIdList = this.props.navigation.getParam('ingdIdList');
      const addtEvalScore =  Number(this.props.navigation.getParam('addtEvalScore'));
      const dietDiseEvalScore = Number(this.props.navigation.getParam('dietDiseEvalScore'));
      const safeCount = Number(this.props.navigation.getParam('safeCount'));
      const cautionCount = Number(this.props.navigation.getParam('cautionCount'));
      const cutBackCount = Number(this.props.navigation.getParam('cutBackCount'));
      const avoidCount = Number(this.props.navigation.getParam('avoidCount'));
      const bannedCount = Number(this.props.navigation.getParam('bannedCount'));
      const recomCount = Number(this.props.navigation.getParam('recomCount'));
      const limitCount = Number(this.props.navigation.getParam('limitCount'));
      const preventCount = Number(this.props.navigation.getParam('preventCount'));
      this.state =
      {
        ingdIdList: ingdIdList,
        addtEvalScore: addtEvalScore,
        dietDiseEvalScore: dietDiseEvalScore,
        safeCount: safeCount,
        cautionCount: cautionCount,
        cutBackCount: cutBackCount,
        avoidCount: avoidCount,
        bannedCount: bannedCount,
        recomCount: recomCount,
        limitCount: limitCount,
        preventCount: preventCount,
        indgNameList: [],
        addtEvalList: [],
        addtEvalDescList: [],
        addtFuncList: [],
        addtInfoList: [],
        addtApprvList: [],
        dietDiseRecomList: [],
        dietDiseRecomStyleList: [],
        dietDiseRecomDescList: [],
        diseRecomList: [],
        diseRecomLevelList: [],
        productName: '',
        isModalActive: false,
        isModalVisible: false,
        consumeFreq: 'M',
        legendModalActive: false,
        diseModalActive: false,
        isLegendModalVisible: false,
        isDiseModalVisible: false
      };
      this.updateField = this.updateField.bind(this);
  }

  showForm = () => {
    this.setState({ isModalVisible: true });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
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

  updateField = (inputObj) => {
    if (inputObj.field == "product name") {
      this.setState({productName: inputObj.text})
    }
    else if (inputObj.field == "consume frequency") {
      this.setState({consumeFreq: inputObj.value})
      var addtEvalScore;
      var dietDiseEvalScore;
      if (inputObj.value == "H") {
        addtEvalScore = ((100.0*this.state.safeCount + 75.0*this.state.cautionCount + 50.0*this.state.cutBackCount + 25.0*this.state.avoidCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 50.0*this.state.limitCount) /
                        (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
      }
      else if (inputObj.value == "M") {
        addtEvalScore = ((100.0*this.state.safeCount + 80.0*this.state.cautionCount + 75.0*this.state.cutBackCount + 30.0*this.state.avoidCount + 5.0*this.state.bannedCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 60.0*this.state.limitCount + 10.0*this.state.preventCount) /
                            (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
      }
      else {
        addtEvalScore = ((100.0*this.state.safeCount + 85.0*this.state.cautionCount + 100.0*this.state.cutBackCount + 35.0*this.state.avoidCount + 10.0*this.state.bannedCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 70.0*this.state.limitCount + 20.0*this.state.preventCount) /
                            (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
      }

      this.setState({
        addtEvalScore: addtEvalScore.toFixed(2),
        dietDiseEvalScore: dietDiseEvalScore.toFixed(2)
      })
    }
  }

  reqSaveEvaluation = () => {
    const navigation = this.props.navigation.getParam('navigation');;
    navigation.navigate('SaveEval', { ingdIdList: this.state.ingdIdList });
  }

  labelChanged = (tabIndex) => {
    let labelIndex = tabIndex.i;
    this.setState({
      accordionItem: [
        {
          title: "Function",
          content: "[Information not available]"
        },
        { title: "Fact",
          content: this.state.addtInfoList[labelIndex]
        }
      ]
    });
  }

  componentDidMount() {
    var ingdId;
    var ingdDupName = [];
    var addFunc;
    var addInfo;
    var addEvalId;
    var ctryDupId = [];
    var diseId = [];
    var ingdRecom = [];
    var ingdIdList = this.state.ingdIdList;
    ingdIdList = ingdIdList.sort();
    let ingdIdListLen = ingdIdList.length;
    ingdUniqueIdList = [];
    if (ingdIdListLen > 0) {
      ingdUniqueIdList.push(ingdIdList[0]);
      if (ingdIdListLen > 1) {
        for (var i = 1; i < ingdIdListLen; i++) {
            if (ingdIdList[i] != ingdIdList[i - 1])
              ingdUniqueIdList.push(ingdIdList[i]);
        }
      }
    }

    this.setState(state => ({
      ingdIdList: ingdUniqueIdList
    }));
    var serverUrl = "http://" + global.address + "/pikafoodar/detail-eval.php";
    ingdUniqueIdList.map((ingdUniqueId) => {

      fetch(serverUrl, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ingdId: ingdUniqueId,
          })
      }).then((response) => response.json()).then((responseJson) => {
            ingdDupName = [];
            ctryDupId = [];
            diseId = [];
            ingdRecom = [];

            ingdId = responseJson[0]["INGD_ID"];
            addFunc = responseJson[0]["ADD_FUNC"];
            addInfo = responseJson[0]["ADD_INFO"];
            addEvalId = responseJson[0]["ADD_EVAL_ID"];
            responseJsonLen = responseJson.length;

            for (var i = 0; i < responseJsonLen; i++) {
              if (responseJson[i]["INGD_NAME"])
                ingdDupName.push(responseJson[i]["INGD_NAME"]);
              if (responseJson[i]["CTRY_ID"])
                ctryDupId.push(responseJson[i]["CTRY_ID"]);
              if (responseJson[i]["DISE_ID"]) {
                if (global.diseList.includes(responseJson[i]["DISE_ID"])) {
                  diseId.push(responseJson[i]["DISE_ID"]);
                }
              }
              if (responseJson[i]["INGD_RECOM"])
                ingdRecom.push(responseJson[i]["INGD_RECOM"]);
            }


            ingdDupName = ingdDupName.sort();
            let ingdDupNameLen = ingdDupName.length;
            var ingdName = [];
            if (ingdDupNameLen > 0) {
              ingdName.push(ingdDupName[0]);
              if (ingdDupNameLen > 1) {
                for (var i = 1; i < ingdDupNameLen; i++) {
                    if (ingdDupName[i] != ingdDupName[i - 1])
                      ingdName.push(ingdDupName[i]);
                }
              }
            }

            ctryDupId = ctryDupId.sort();
            let ctryDupIdLen = ctryDupId.length;
            ctryId = [];
            if (ctryDupIdLen > 0) {
              ctryId.push(ctryDupId[0]);
              if (ctryDupIdLen > 1) {
                for (var i = 1; i < ctryDupIdLen; i++) {
                    if (ctryDupId[i] != ctryDupId[i - 1])
                      ctryId.push(ctryDupId[i]);
                }
              }
            }

            var diseItemRecom = [];
            let diseIdLen = diseId.length;
            let isDuplicate;
            if (diseIdLen > 0) {
              diseItemRecom.push({
                diseId: diseId[0],
                ingdRecom: ingdRecom[0]
              })
              if (diseIdLen > 1) {
                for (var i = 1; i < diseIdLen; i++) {
                  isDuplicate = false;
                  for (var j = i-1; j >= 0; j--)
                    if (diseId[i] == diseId[j] && ingdRecom[i] == ingdRecom[j]) {
                      isDuplicate = true;
                      break;
                    }
                  if (!(isDuplicate))
                    diseItemRecom.push({
                      diseId: diseId[i],
                      ingdRecom: ingdRecom[i]
                    });
                }
              }
            }



            var addEval;
            var addtEvalDesc;
            switch(addEvalId) {
              case '1':
                addEval = "check-circle";
                addtEvalDesc = "Appears to be safe.";
                break;
              case '2':
                addEval = "error";
                addtEvalDesc = "May pose a risk and needs to be better tested. Try to avoid.";
                break;
              case '3':
                addEval = "content-cut";
                addtEvalDesc = "Not toxic, but large amounts may be unsafe or promote bad nutrition.";
                break;
              case '4':
                addEval = "group";
                addtEvalDesc = "May trigger an acute, allergic reaction, intolerance, or other problems.";
                break;
              case '5':
                addEval = "do-not-disturb-alt"
                addtEvalDesc = "Unsafe in amounts consumed or is very poorly tested and not worth any risk.";
                break;
              case '6':
                addEval = "cancel"
                addtEvalDesc = "History of food additives is riddled with additives that, after many years of use, were found to pose health risks and banned.";
            }

            var ctryImgSrc = [];
            let ctryIdLen = ctryId.length;
            for (var i = 0; i < ctryIdLen; i++) {
              switch(ctryId[i]) {
                case '10':
                  ctryImgSrc.push(require('../assets/images/united-kingdom.png'));
                  break;
                case '11':
                  ctryImgSrc.push(require('../assets/images/united-states.png'));
                  break;
                case '12':
                  ctryImgSrc.push(require('../assets/images/canada.png'));
                  break;
                case '13':
                  ctryImgSrc.push(require('../assets/images/japan.png'));
                  break;
                case '14':
                  ctryImgSrc.push(require('../assets/images/new-zealand.png'));
                }
            }
            let diseItemRecomLen = diseItemRecom.length;
            var diseRiskEval;
            for (var i = 0; i < diseItemRecomLen; i++) {

                if (diseItemRecom[i].ingdRecom == 'P') {
                  diseRiskEval = 'P';
                  break;
                }
                else if (diseItemRecom[i].ingdRecom == 'L' && diseRiskEval != 'P')
                  diseRiskEval = 'L';
                else if (diseItemRecom[i].ingdRecom == 'R' && diseRiskEval != 'P' && diseRiskEval != 'L')
                  diseRiskEval = 'R';
            }

            var dietRecomIcon;
            var dietRecomIconStyle;
            var dietRecomDesc;
            switch(diseRiskEval) {
              case 'R':
                dietRecomIcon = "sentiment-satisfied";
                dietRecomIconStyle = [{fontSize: 30}, {color: "#00C851"}];
                dietRecomDesc = "Recommended for consumption";
                break;
              case 'L':
                dietRecomIcon = "sentiment-neutral";
                dietRecomIconStyle = [{fontSize: 30}, {color: "#FAD61F"}];
                dietRecomDesc = "Limit your consumption";
                break;
              case 'P':
                dietRecomIcon = "sentiment-dissatisfied";
                dietRecomIconStyle = [{fontSize: 30}, {color: "#F62D13"}];
                dietRecomDesc = "Prevent your consumption at all cost";
                break;
            }

            var diseImgSrc = [];
            diseItemRecomLen = diseItemRecom.length;
            for (var i = 0; i < diseItemRecomLen; i++) {
              switch(diseItemRecom[i].diseId) {
                case '10':
                  diseImgSrc.push(require('../assets/images/Ischaemic-Heart.png'));
                  break;
                case '11':
                  diseImgSrc.push(require('../assets/images/Stroke.png'));
                  break;
                case '12':
                  diseImgSrc.push(require('../assets/images/Respiratory-Infections.png'));
                  break;
                case '13':
                  diseImgSrc.push(require('../assets/images/Dementias-Alzheimer.png'));
                  break;
                case '14':
                  diseImgSrc.push(require('../assets/images/Cancer.png'));
                  break;
                case '15':
                  diseImgSrc.push(require('../assets/images/Diabetes.png'));
                  break;
                case '16':
                  diseImgSrc.push(require('../assets/images/Diarrhoeal.png'));
                  break;
                }
            }

            var diseImgStyle = [];
            for (var i = 0; i < diseItemRecomLen; i++) {
              switch(diseItemRecom[i].ingdRecom) {
                case 'R':
                  diseImgStyle.push("#00C851");
                  break;
                case 'L':
                  diseImgStyle.push("#FAD61F");
                  break;
                case 'P':
                  diseImgStyle.push("#F62D13");
                }
            }

            this.setState(state => ({
              indgNameList: state.indgNameList.concat([ingdName]),
              addtEvalList: state.addtEvalList.concat(addEval),
              addtEvalDescList: state.addtEvalDescList.concat(addtEvalDesc),
              addtFuncList: state.addtFuncList.concat(addFunc),
              addtInfoList: state.addtInfoList.concat(addInfo),
              addtApprvList: state.addtApprvList.concat([ctryImgSrc]),
              dietDiseRecomList: state.dietDiseRecomList.concat(dietRecomIcon),
              dietDiseRecomStyleList: state.dietDiseRecomStyleList.concat([dietRecomIconStyle]),
              dietDiseRecomDescList: state.dietDiseRecomDescList.concat(dietRecomDesc),
              diseRecomList: state.diseRecomList.concat([diseImgSrc]),
              diseRecomLevelList: state.diseRecomLevelList.concat([diseImgStyle])
            }));

      }).catch((error) => {
          console.log(error);
          console.log("skip");
      });
    });

    this.setState({
      accordionItem: [
        {
          title: "Function",
          content: this.state.addtFuncList[0]
        },
        { title: "Fact",
          content: this.state.addtInfoList[0]
        }
      ]
    });
  }

  render() {
    var addtStyle = [ globStyle.orangeCrayola, {fontSize: 25} ];
    let diseRecomList = this.state.diseRecomList;
    let diseRecomListLen = diseRecomList.length;
    let diseRecomLevelList = this.state.diseRecomLevelList;

    var diseRecomFullItemList = [];
    for (var i = 0; i < diseRecomListLen; i++) {
      let diseRecom = diseRecomList[i];
      let diseRecomLevel = diseRecomLevelList[i];
      let diseRecomLen = diseRecom.length;
      var diseRecomItemList = [];
      for (var j = 0; j < diseRecomLen; j++) {
        let diseRecomItem = {
          diseRecom: diseRecom[j],
          diseRecomLevel: diseRecomLevel[j]
        }
        diseRecomItemList.push(diseRecomItem);
      }
      diseRecomFullItemList.push(diseRecomItemList);
    }
    // var indgNameList = this.state.indgNameList;
    // indgNameListLen =  indgNameList.length;
    // ingdFirstNameList = [];
    // for (var i = 1; i < indgNameListLen; i++) {
    //   ingdFirstNameList.push(indgNameList[i][0]);
    // }

    let indgNameList = this.state.indgNameList;
    let addtEvalList = this.state.addtEvalList;
    let addtEvalDescList = this.state.addtEvalDescList;
    let addtFuncList = this.state.addtFuncList;
    let addtInfoList = this.state.addtInfoList;
    let addtApprvList = this.state.addtApprvList;
    let dietDiseRecomList = this.state.dietDiseRecomList;
    let dietDiseRecomStyleList = this.state.dietDiseRecomStyleList;
    let dietDiseRecomDescList = this.state.dietDiseRecomDescList;


    let indgNameListLen = indgNameList.length;
    var fullLabelDetailList = [];
    for (var k = 0; k < indgNameListLen; k++) {
      let fullLabelDetail = {
        indgName: indgNameList[k],
        addtEval: addtEvalList[k],
        addtEvalDesc: addtEvalDescList[k],
        addtFunc: addtFuncList[k],
        addtInfo: addtInfoList[k],
        addtApprv: addtApprvList[k],
        dietDiseRecom: dietDiseRecomList[k],
        dietDiseRecomStyle: dietDiseRecomStyleList[k],
        dietDiseRecomDesc: dietDiseRecomDescList[k],
        diseRecomFullItem: diseRecomFullItemList[k]
      }
      fullLabelDetailList.push(fullLabelDetail);
    }

    return (
      <Container>
        <AppPageHeading/>
      <Tabs renderTabBar={() => <ScrollableTab />}
            onChangeTab={this.labelChanged}>
          {fullLabelDetailList && fullLabelDetailList.map((fullLabelDetail) =>
            <Tab heading={fullLabelDetail.indgName[0]}
                 tabStyle={[ globStyle.charcoalFill ]}
                 activeTabStyle={[ globStyle.orangeCrayolaFill ]}
                 textStyle={[ globStyle.antiFlashWhite, {fontFamily: 'righteous'}, {fontWeight: '400'} ]}
                 activeTextStyle={[ globStyle.antiFlashWhite, {fontFamily: 'righteous'}, {fontWeight: '600'} ]}>
              <Container style={ [{marginTop: 20}, {width: 350}, {alignSelf: 'center'} ]}>
                <Text style={[ globStyle.darkGunmetal, {fontFamily: 'righteous'}, {fontSize: 18}, {fontWeight: '700'}, {textAlign: 'center'} ]}>
                  |
                  {fullLabelDetail.indgName && fullLabelDetail.indgName.map((name) =>
                    " " + name + " | "
                  )}
                </Text>
                <Card>
                  <CardItem>
                    <Left>
                      <Icon active name={fullLabelDetail.addtEval} type='MaterialIcons' style={[ globStyle.orangeCrayola, {fontSize: 30} ]}/>
                      <Body>
                        <Text style={[ globStyle.uclaBlue, {fontFamily: 'pokemon-solid'} ]}>Additive Info</Text>
                        <Text note style={[ {fontFamily: 'nunito'} ]}>
                          {fullLabelDetail.addtEvalDesc}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Accordion
                      dataArray={this.state.accordionItem}
                      headerStyle={[ {backgroundColor: "#E1BC05"}, {fontFamily: 'alegreya-sans'} ]}
                      contentStyle={[ {backgroundColor: "#FAD61F"}, {fontFamily: 'nunito'} ]}
                    />
                  </CardItem>
                  <CardItem>
                    <Text style={[ globStyle.uclaBlue, {fontFamily: 'alegreya-sans'}, {textAlign: 'center'} ]}>Approved In: </Text>

                      <Text style={[ globStyle.darkGunmetal, {fontSize: 17}, {fontFamily: 'righteous'}, {textAlign: 'center'} ]}>
                           NA
                      </Text>
                  </CardItem>
                </Card>
                <Card style={[ {height: 135} ]}>
                  <CardItem>
                    <Left>
                      <Icon active name={fullLabelDetail.dietDiseRecom} type='MaterialIcons' style={fullLabelDetail.dietDiseRecomStyle}/>
                      <Body>
                        <Text style={[ globStyle.uclaBlue, {fontFamily: 'pokemon-solid'} ]}>Diet-disease Info</Text>
                      <Text note style={[ {fontFamily: 'nunito'} ]}>
                        {fullLabelDetail.dietDiseRecomDesc}
                      </Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <View style={[ {flex: 1} ]}>
                      <View style={[ {flex: 1}, {flexDirection: 'row'}, {justifyContent: 'center'}, {marginLeft: 20} ]}>
                        {fullLabelDetail.diseRecomFullItem && fullLabelDetail.diseRecomFullItem.map((diseRecomItem) =>
                          <Image
                            source= {diseRecomItem.diseRecom}
                            style={ [ {height: 50}, {width: 50}, {marginLeft: 10}, {marginRight: 10}, {borderWidth: 3}, {borderRadius: 5}, {borderColor: diseRecomItem.diseRecomLevel} ]}
                          />
                        )}
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </Container>
            </Tab>
          )}
        </Tabs>
        <Fab
          active={this.state.isModalActive}
          style={[ globStyle.charcoalFill, {position: 'relative'}, {right: 220}, {top: 8} ]}
          position="bottomRight"
          onPress={this.showForm}>
          <Icon name="save" type="MaterialIcons"/>
        </Fab>
        <Modal isVisible={this.state.isModalVisible} onBackButtonPress={this.closeModal}>
          <View style={[ { flex: 1 }, {marginTop: 420}, {marginLeft: 40}, {marginRight: 40}, {height: 0} ]}>
            <Text style={[ globStyle.antiFlashWhite, {fontSize: 17}, {fontFamily: 'righteous'}, {textAlign: 'center'} ]}>
              Save Food Product
            </Text>
            <TextInput icon="face" placeholder="product name" updateField={this.updateField}/>
            <PickerConsumeFreq updateField={this.updateField}/>
            <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.charcoal, globStyle.whiteFill, {fontSize: 14} ]}>
              Additives Score : {" "}
              <Text style = {[ {fontFamily: "pokemon-solid"}, globStyle.orangeCrayola, {fontSize: 18} ]}>
                {this.state.addtEvalScore}{" %"}
              </Text>
            </Text>
            <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.charcoal, globStyle.whiteFill, {fontSize: 14} ]}>
              Diet-disease Score : {" "}
              <Text style = {[ {fontFamily: "pokemon-solid"}, globStyle.orangeCrayola, {fontSize: 18} ]}>
                {this.state.dietDiseEvalScore}{" %"}
              </Text>
            </Text>
            <RoundButton text="Save" action="saveEval"
                         field={{ ingdIdList: this.state.ingdIdList, productName: this.state.productName, consumeFreq: this.state.consumeFreq, addtEvalScore: this.state.addtEvalScore, dietDiseEvalScore: this.state.dietDiseEvalScore }}/>
          </View>
        </Modal>
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
