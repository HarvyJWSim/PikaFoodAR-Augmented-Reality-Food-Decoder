import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {Container, Item, Body, Icon, Button, Fab} from 'native-base';
import AppHeading from '../components/AppHeading';
import TextInput from '../components/TextInput';
import RoundButton from '../components/RoundButton';
import AdditiveLegend from '../components/AdditiveLegend';
import RecomLegend from '../components/RecomLegend';
import * as Animatable from 'react-native-animatable';
import {globStyle} from './../GlobalStyle'
import { Camera, Permissions, ImageManipulator, FileSystem, Asset, ImagePicker } from 'expo';
import Environment from "./../environment";
import firebase from "./../utils/firebase";
import Svg, {Line} from 'react-native-svg';
import * as Progress from 'react-native-progress';
import Modal from "react-native-modal";

const addtStyle = {
  fontSize: 18
};

const addtTxtStyle = {
  fontSize: 12
};

export default class AugmentedRealityScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // fuzzyMatch = (label) => {
  //   var label = "Applq";
  //   var ingdNameList = this.state.ingdNameList;
  //   var ingdNameListLen = ingdNameList.length;
  //   var minLevenshteinVal = 99;
  //   var levenshteinVal;
  //   var ingdNameIndex = 0;
  //
  //   for (var i = 0; i < ingdNameListLen; i++) {
  //     console.log(ingdNameList[i]);
  //     levenshteinVal = this.computeLevenshtein(label, ingdNameList[i]);
  //     if (levenshteinVal < minLevenshteinVal) {
  //       minLevenshteinVal = levenshteinVal;
  //       ingdNameIndex = i;
  //       if (minLevenshteinVal == 0)
  //         break;
  //     }
  //   }
  //   console.log("MIN" + minLevenshteinVal);
  //   console.log("INDEX" + ingdNameIndex);
  //
  //   if (minLevenshteinVal < 10)
  //     return ingdNameList[ingdNameIndex];
  //   else
  //     return "";
  // }

  // computeLevenshtein = (label, ingdName) => {
  //     if (label.length == 0)
  //       return ingdName.length;
  //     if (ingdName.length == 0)
  //       return label.length;
  //
  //     var computeMatrix = [];
  //     for (var i = 0; i <= ingdName.length; i++)
  //       computeMatrix[i] = [i];
  //     for (var j = 0; j <= label.length; j++)
  //       computeMatrix[0][j] = j;
  //
  //     for (var i = 1; i <= ingdName.length; i++) {
  //       for (var j = 1; j <= label.length; j++) {
  //         if(ingdName.charAt(i-1) == label.charAt(j-1)) {
  //           computeMatrix[i][j] = computeMatrix[i-1][j-1];
  //         } else {
  //           computeMatrix[i][j] = Math.min(computeMatrix[i-1][j-1] + 1, computeMatrix[i][j-1] + 2, computeMatrix[i-1][j] + 2);
  //         }
  //       }
  //     }
  //
  //     console.log("Levenshtein");
  //     console.log(computeMatrix[ingdName.length][label.length]);
  //     return computeMatrix[ingdName.length][label.length];
  // }

  evaluateDiseRisk = (fuzzyMatchedlabel, digitisedTextJson, label) => {
    console.log("MATCHING " + fuzzyMatchedlabel + " AND " + label)

    // label = label.replace(/\(|\)/, "");
    let serverUrl = "http://" + global.address + "/pikafoodar/dise-risk-eval.php";
    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingdName: fuzzyMatchedlabel,
        })
    }).then((response) => response.json()).then((responseJson) => {
        if (responseJson.length > 0 && responseJson[0].hasOwnProperty("INGD_RECOM")) {
            let responseJsonLen = responseJson.length;
            var filteredResponseJson = [];
            for (var i = 0; i < responseJsonLen; i++) {
              if (global.diseList.includes(responseJson[i]["DISE_ID"])) {
                filteredResponseJson.push(responseJson[i]["INGD_RECOM"]);
              }
            }
            responseJsonLen = filteredResponseJson.length;
            var diseRiskEval;
            for (var i = 0; i < responseJsonLen; i++) {
              if (filteredResponseJson[i] == 'P') {
                diseRiskEval = 'P';
                break;
              }
              else if (filteredResponseJson[i] == 'L' && diseRiskEval != 'P')
                diseRiskEval = 'L';
              else if (filteredResponseJson[i] == 'R' && diseRiskEval != 'P' && diseRiskEval != 'L')
                diseRiskEval = 'R';
            }

            // let diseRiskEval = responseJson[0]["INGD_RECOM"];
            if (diseRiskEval != null) {
              this.setState(state => ({
                ingdIdList: state.ingdIdList.concat(responseJson[0]["INGD_ID"])
              }));
              var diseRiskEvalList = [];
              switch(diseRiskEval) {
                case 'R':
                  diseRiskEvalList = this.state.diseRiskEval.concat("#00C851")
                  this.setState(previousState => ({ recomCount: previousState.recomCount + 1 }));
                  break;
                case 'L':
                  diseRiskEvalList = this.state.diseRiskEval.concat("#FAD61F")
                  this.setState(previousState => ({ limitCount: previousState.limitCount + 1 }));
                  break;
                case 'P':
                  diseRiskEvalList = this.state.diseRiskEval.concat("#F62D13")
                  this.setState(previousState => ({ preventCount: previousState.preventCount + 1 }));
              }

              let dietDiseEvalScore = ((100.0*this.state.recomCount + 60.0*this.state.limitCount + 10.0*this.state.preventCount) /
                                      (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
              this.setState({
                dietDiseEvalScore: dietDiseEvalScore.toFixed(2)
              });

              let digitisedTextJsonLen = digitisedTextJson.responses[0].textAnnotations.length;
              let labelIndex = 0;
              for (var i = 1; i < digitisedTextJsonLen; i++) {
                var jsonLabel = digitisedTextJson.responses[0].textAnnotations[i].description.toLowerCase();
                label = label.replace(/\,|\(|\)/, "");
                jsonLabel = jsonLabel.replace(/\,|\(|\)/, "");
                if (jsonLabel == label.split(" ")[0]) {
                  console.log("MATCHED DISE" + fuzzyMatchedlabel);
                  vertices  = digitisedTextJson.responses[0].textAnnotations[i].boundingPoly.vertices;
                  let xPointOne = this.mapXAxisLine(vertices[0].x);
                  let xPointTwo = this.mapXAxisLine(vertices[2].x);
                  let yPointOne = this.mapYAxisLine(vertices[0].y);
                  let yPointTwo = this.mapYAxisLine(vertices[2].y);

                  this.setState(state => ({
                    xPoint1: state.xPoint1.concat(xPointOne),
                    xPoint2: state.xPoint2.concat(xPointTwo),
                    yPoint1: state.yPoint1.concat(yPointOne),
                    yPoint2: state.yPoint2.concat(yPointTwo),
                    diseRiskEval: diseRiskEvalList
                  }), () => {
                    i = digitisedTextJsonLen;
                  });
                }
              }
            }
          }
        }).catch((error) => {
          console.log(error);
            console.log("skip");
        });
  }

  evaluateAddt = (fuzzyMatchedlabel, digitisedTextJson, label) => {
    console.log("MATCHING " + fuzzyMatchedlabel + " AND " + label)
    // label = label.replace(/\(|\)/, "");
    let serverUrl = "http://" + global.address + "/pikafoodar/addt-eval.php";

    fetch(serverUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingdName: fuzzyMatchedlabel,
        })
    }).then((response) => response.json()).then((responseJson) => {
        if (responseJson.length > 0) {
          let addEvalId = responseJson[0]["ADD_EVAL_ID"];
          var addtEvalList = [];
          switch(addEvalId) {
            case '1':
              addtEvalList = this.state.addtEval.concat("check-circle")
              this.setState(previousState => ({ safeCount: previousState.safeCount + 1 }));
              break;
            case '2':
              addtEvalList = this.state.addtEval.concat("error")
              this.setState(previousState => ({ cautionCount: previousState.cautionCount + 1 }));
              break;
            case '3':
              addtEvalList = this.state.addtEval.concat("content-cut")
              this.setState(previousState => ({ cutBackCount: previousState.cutBackCount + 1 }));
              break;
            case '4':
              addtEvalList = this.state.addtEval.concat("group")
              break;
            case '5':
              addtEvalList = this.state.addtEval.concat("do-not-disturb-alt")
              this.setState(previousState => ({ avoidCount: previousState.avoidCount + 1 }));
              break;
            case '6':
              addtEvalList = this.state.addtEval.concat("cancel")
              this.setState(previousState => ({ bannedCount: previousState.bannedCount + 1 }));
            default:
              return;
          }

          let addtEvalScore = ((100.0*this.state.safeCount + 80.0*this.state.cautionCount + 75.0*this.state.cutBackCount + 30.0*this.state.avoidCount + 5.0*this.state.bannedCount) /
          (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
          this.setState({
            addtEvalScore: addtEvalScore.toFixed(2)
          });

          if (addtEvalList != []) {
            this.setState(state => ({
              ingdIdList: state.ingdIdList.concat(responseJson[0]["INGD_ID"])
            }));
            let digitisedTextJsonLen = digitisedTextJson.responses[0].textAnnotations.length;
            let labelIndex = 0;
            for (var i = 1; i < digitisedTextJsonLen; i++) {
              var jsonLabel = digitisedTextJson.responses[0].textAnnotations[i].description.toLowerCase();
              label = label.replace(/\,|\(|\)/, "");
              jsonLabel = jsonLabel.replace(/\,|\(|\)/, "");
              if (jsonLabel == label.split(" ")[0]) {
                console.log("MATCHED " + fuzzyMatchedlabel);
                vertices  = digitisedTextJson.responses[0].textAnnotations[i].boundingPoly.vertices;
                xPoint = this.mapXPoint(vertices[0].x);
                yPoint = this.mapYPoint(vertices[0].y);
                this.setState(state => ({
                  xMidPoint: state.xMidPoint.concat(xPoint),
                  yMidPoint: state.yMidPoint.concat(yPoint),
                  addtEval: addtEvalList
                }), () => {
                  i = digitisedTextJsonLen;
                });
              }
            }
          }
        }
    }).catch((error) => {
        console.log("error");
    });
  }

  constructor(props) {
      super(props);
      this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        xPoint1 : [],
        xPoint2 : [],
        yPoint1 : [],
        yPoint2 : [],
        xMidPoint: [],
        yMidPoint: [],
        addtEval: [],
        ingdIdList: [],
        diseRiskEval: [],
        ARGuideText : "Pikaaa zzz... Tap the Button below to start scanning!",
        imageSrc : require("../assets/images/Pika-Sleep.png"),
        safeCount: 0,
        cautionCount: 0,
        cutBackCount: 0,
        avoidCount: 0,
        bannedCount: 0,
        recomCount: 0,
        limitCount: 0,
        preventCount: 0,
        addtEvalScore: 0,
        dietDiseEvalScore: 0,
        active: false,
        progress: 0,
        progressColor: "#546893",
        legendModalActive: false,
        diseModalActive: false,
        isLegendModalVisible: false,
        isDiseModalVisible: false,
        tokenList: [],
        tokenNameList: [],
        fuzzyMatchedTokenNameList: [],
        scanAnimIterationCnt: "infinite",
        detailEvalAnimIterationCnt: "0"
      };
      this.evaluateAddt = this.evaluateAddt.bind(this);
      this.evaluateDiseRisk = this.evaluateDiseRisk.bind(this);
      // this.computeLevenshtein = this.computeLevenshtein.bind(this);
      // this.fuzzyMatch = this.fuzzyMatch.bind(this);
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

  toggleConsumeFreq = (consumeFreq) => {
    let addtEvalScore;
    let dietDiseEvalScore;

    switch(consumeFreq) {
      case "frequent":
        addtEvalScore = ((100.0*this.state.safeCount + 75.0*this.state.cautionCount + 50.0*this.state.cutBackCount + 25.0*this.state.avoidCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 50.0*this.state.limitCount) /
                        (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
        break;
      case "moderate":
        addtEvalScore = ((100.0*this.state.safeCount + 80.0*this.state.cautionCount + 75.0*this.state.cutBackCount + 30.0*this.state.avoidCount + 5.0*this.state.bannedCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 60.0*this.state.limitCount + 10.0*this.state.preventCount) /
                            (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
        break;
      case "rare":
        addtEvalScore = ((100.0*this.state.safeCount + 85.0*this.state.cautionCount + 100.0*this.state.cutBackCount + 35.0*this.state.avoidCount + 10.0*this.state.bannedCount) /
                        (100.0 * (this.state.safeCount + this.state.cautionCount + this.state.cutBackCount + this.state.avoidCount + this.state.bannedCount))) * 100.0;
        dietDiseEvalScore = ((100.0*this.state.recomCount + 70.0*this.state.limitCount + 20.0*this.state.preventCount) /
                            (100.0 * (this.state.recomCount + this.state.limitCount + this.state.preventCount))) * 100.0;
        break;
    }
    this.setState({
      addtEvalScore: addtEvalScore.toFixed(2),
      dietDiseEvalScore: dietDiseEvalScore.toFixed(2)
    });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    this.setState({
      xPoint1 : [],
      xPoint2 : [],
      yPoint1 : [],
      yPoint2 : [],
      xMidPoint: [],
      yMidPoint: [],
      addtEval: [],
      ingdIdList: [],
      diseRiskEval: [],
      tokenList: [],
      tokenNameList: [],
      fuzzyMatchedTokenNameList: [],
      ARGuideText : "Pikaaa zzz... Tap the Button below to start scanning!",
      progress: 0,
      scanAnimIterationCnt: "0"
    });
    if (this.camera) {
      this.setState({
        ARGuideText: "Food Label Detection Starts...",
        imageSrc : require("../assets/images/Pika-Stand.png"),
        progress: 0.1,
        progressColor: "#546893"
      });
      let photo = await this.camera.takePictureAsync({quality: 0.5, base64: true});
      try {
        this.setState({ uploading: true });
        //const uri = Asset.fromModule(require('../assets/images/Beverage.jpg')).uri;
        //const manipResult = await ImageManipulator.manipulateAsync(url, [], { base64: true });
        //var encodedString = Base64.encode(uri);
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "DOCUMENT_TEXT_DETECTION" },
                //{ type: "CROP_HINTS" }
              ],
              image: {
                  content: photo.base64
              }
            }
          ]
        });
        console.log("FETCHING");

        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
            Environment["GOOGLE_CLOUD_VISION_API_KEY"],
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        this.setState({
          ARGuideText: "Food Label Detected!",
          imageSrc : require("../assets/images/Pika-Stand.png"),
          progress: 0.3
        });
        var digitisedTextJson = await response.json();
        // console.log(responseJson);


        this.setState({
          ARGuideText: "Processing Food Label...",
          imageSrc : require("../assets/images/Pika-Stand.png"),
          progress: 0.4
        }, () => {
          let text  = digitisedTextJson.responses[0].textAnnotations[0].description;
          text = text.replace(/\n/g, " ");
          text = text.replace("and", ",");
          text = text.replace("&", ",");
          let tokenList = text.split(/\,|\(|\)|\:/);
          var stopWords = ["extract", "vitamin", "powder", "natural"];
          stopWordsLen = stopWords.length;
          console.log(tokenList.length);
          tokenList = tokenList.map(elem => {
            for (var i = 0; i < stopWordsLen; i++)
              elem = elem.replace(stopWords[i], "");
            elem = elem.trim();
            elem = elem.toLowerCase();
            var elemLen = elem.length;
            if (elem.charAt(elem.length - 1) == 's')
              elem = elem.substring(0, elemLen - 1);
            return elem;
          });
          //console.log(vertices);
          let tokenListLen = tokenList.length;

          var promiseList = [];
          var fuzzyMatchedTokenNameList = [];
          for (var i = 0; i < tokenListLen; i++) {
            fuzzyMatchedTokenNameList[i] = tokenList[i];
          }
          this.setState({
            tokenList: tokenList
          }, () => {
            var tokenList = this.state.tokenList;
            // console.log("ISTOKENLIST EMPTY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + tokenList);
            // console.log("ISTOKENLIST EMPTY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + typeof(tokenList));
            var promiseList = [];
            for (var i = 0; i < tokenListLen; i++) {
              let serverUrl = "http://" + global.address + "/pikafoodar/ingd-name.php";
              var promise = fetch(serverUrl, {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      token: tokenList[i]
                  })
              }).then(async(response) =>await response.json()).then((responseJson) => {
                if (responseJson.hasOwnProperty("ingdName")) {
                  var fuzzyMatchedIngdName = responseJson.ingdName;
                  var ingdName = responseJson.initIngdName;
                  if (fuzzyMatchedIngdName != "Mismatch") {
                    if (fuzzyMatchedTokenNameList[i] != fuzzyMatchedIngdName) {
                      console.log("SUCCESS! CHANGEDTO" + fuzzyMatchedIngdName);
                      fuzzyMatchedTokenNameList[i] = fuzzyMatchedIngdName;
                    }

                    console.log("MYTOKENNEW2" + ingdName);
                    console.log("MYFUZZYNEW2" + fuzzyMatchedTokenNameList[i]);
                    this.setState(state => ({
                      tokenNameList: state.tokenNameList.concat(ingdName),
                      fuzzyMatchedTokenNameList: state.fuzzyMatchedTokenNameList.concat(fuzzyMatchedTokenNameList[i]),
                    }));
                  }
                  // this.setState({
                  //   tokenNameList: tokenList,
                  //   fuzzyMatchedTokenNameList: fuzzyMatchedTokenNameList
                  // });
                }
              }).catch((error) => {
                  console.log("error");
              });
              promiseList.push(promise);
            }
          });

          // await delay(1000);
          // console.log("WAIT 1SEC")
          // await delay(1000);
          // console.log("WAIT 1SEC")
          // await delay(1000);
          // console.log("WAIT 1SEC")
// Promise.all(promiseList).then(
          setTimeout(() => {
            console.log("START LAST FUNC");
            var tokenNameList = this.state.tokenNameList;
            var fuzzyMatchedTokenNameList = this.state.fuzzyMatchedTokenNameList;
            console.log("TOKEN TO PROMISE" + tokenNameList);
            console.log("FUZZY TO PROMISE" + fuzzyMatchedTokenNameList);
            let newlinePattern = /\n/;
            var newLinePos;
            var tokenListLen = tokenNameList.length;
            this.setState({
              ARGuideText: "Evaluating Food Additives...",
              imageSrc : require("../assets/images/Pika-Stand.png"),
              progress: 0.6
            }, () => {
              for (var i = 0; i < tokenListLen; i++) {
                newLinePos = fuzzyMatchedTokenNameList[i].search(newlinePattern);
                if (newLinePos == -1)
                  this.evaluateAddt(fuzzyMatchedTokenNameList[i], digitisedTextJson, tokenNameList[i]);
              }

              this.setState({
                ARGuideText: "Evaluating Food Ingredients...",
                imageSrc : require("../assets/images/Pika-Stand.png"),
                progress: 0.8
              }, () => {
                for (var i = 0; i < tokenListLen; i++) {
                  newLinePos = fuzzyMatchedTokenNameList[i].search(newlinePattern);
                  if (newLinePos == -1)
                    this.evaluateDiseRisk(fuzzyMatchedTokenNameList[i], digitisedTextJson, tokenNameList[i]);
                }
                // this.evaluateAddt("salt", digitisedTextJson);
                //tokenList.map(this.evaluateLabel);
                //console.log("LENGTH" + responseJson.length);
                // console.log(responseJson[0].vertices);
                // this.setState({
                //   googleResponse: responseJson,
                //   uploading: false
                // });
                this.setState({
                  ARGuideText: "Evaluation Done!",
                  imageSrc : require("../assets/images/Pika-Sleep.png"),
                  progress: 1.0,
                  progressColor: "#00C851",
                  detailEvalAnimIterationCnt: "5"
                });

              });

            });
        }, 2000);
      })
      } catch (error) {
        console.log(error);
      }
    }
  }

  mapXAxisLine = (xPoint) => {
    return (0.1055 * xPoint) - 4.2404
  }

  mapYAxisLine = (yPoint) => {
    return (0.1198 * yPoint) + 5.5852
  }

  mapXPoint = (xPoint) => {
    return (0.1111 * xPoint) - 5.2222
  }

  mapYPoint = (yPoint) => {
    return (-0.1272 * yPoint) + 569
  }

  render() {
    var addtEvalScore = "NA";
    var dietDiseEvalScore = "NA";
    if (this.state.addtEvalScore != 0) {
      addtEvalScore = this.state.addtEvalScore + "%";
    }
    else {
      addtEvalScore = "NA";
    }
    if (this.state.dietDiseEvalScore != 0) {
      dietDiseEvalScore = this.state.dietDiseEvalScore + "%";
    }
    else {
      dietDiseEvalScore = "NA";
    }
    const { hasCameraPermission } = this.state;
    let xPoint1List = this.state.xPoint1;
    let xPoint2List = this.state.xPoint2;
    let yPoint1List = this.state.yPoint1;
    let yPoint2List = this.state.yPoint2;
    let diseRiskEvalList = this.state.diseRiskEval;
    let pointListLen = xPoint1List.length;
    let boundingPointList = [];
    for (var i = 0; i < pointListLen; i++) {
      let boundingPoint = {
        xPoint1: xPoint1List[i],
        xPoint2: xPoint2List[i],
        yPoint1: yPoint1List[i],
        yPoint2: yPoint2List[i],
        diseRiskEval: diseRiskEvalList[i]
      }
      boundingPointList.push(boundingPoint);
    }

    let xPointList = this.state.xMidPoint;
    let yPointList = this.state.yMidPoint;
    let addtEvalList = this.state.addtEval;
    pointListLen = xPointList.length;
    let iconPointList = [];
    for (var i = 0; i < pointListLen; i++) {
      let iconPoint = {
        xPoint:
          { left: xPointList[i] },
        yPoint:
          { bottom: yPointList[i] },
        addtEval: addtEvalList[i]
      }
      iconPointList.push(iconPoint);
    }

    if (hasCameraPermission === null) {
      return <View />;
    }
    else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    else {
      return (
        <View style={{ flex: 1 }}>
          <View style={ [globStyle.topContainer, globStyle.darkGunmetalFill, {height: 100}] }>
            <Animatable.Text
                style={[ globStyle.deepLemon, {marginTop: 25}, {marginLeft: 20}, {fontSize: 22}, {fontFamily: 'alegreya'}, {fontWeight: 'bold'} ]}
                animation="pulse"
                iterationCount="infinite">
                {this.state.ARGuideText}
            </Animatable.Text>
          </View>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View style={[ {flex: 1}, {backgroundColor: 'transparent'}, {flexDirection: 'row'}, {justifyContent: 'center'}, {position: 'relative'} ]}>
              <Svg height="100%" width="100%" style={[ {position: 'absolute'} ]}>
                {boundingPointList.map((boundingPoint) =>
                  <View>
                    <Line x1={boundingPoint.xPoint1} y1={boundingPoint.yPoint1} x2={boundingPoint.xPoint1} y2={boundingPoint.yPoint2}
                          stroke={boundingPoint.diseRiskEval} strokeWidth="1" />
                    <Line x1={boundingPoint.xPoint1} y1={boundingPoint.yPoint1} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint1}
                          stroke={boundingPoint.diseRiskEval} strokeWidth="1" />
                    <Line x1={boundingPoint.xPoint2} y1={boundingPoint.yPoint1} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint2}
                          stroke={boundingPoint.diseRiskEval} strokeWidth="1" />
                    <Line x1={boundingPoint.xPoint1} y1={boundingPoint.yPoint2} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint2}
                          stroke={boundingPoint.diseRiskEval} strokeWidth="1" />
                  </View>
                  // <Line x1={boundingPoint.xPoint1} y1={boundingPoint.yPoint1} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint1}
                  //       stroke="red" strokeWidth="1" />
                  // <Line x1={boundingPoint.xPoint2} y1={boundingPoint.yPoint1} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint2}
                  //       stroke="red" strokeWidth="1" />
                  // <Line x1={boundingPoint.xPoint1} y1={boundingPoint.yPoint2} x2={boundingPoint.xPoint2} y2={boundingPoint.yPoint2}
                  //       stroke="red" strokeWidth="1" />
                )}
              </Svg>
              {iconPointList.map((iconPoint) =>
                <Animatable.View style={[ {position: 'absolute'}, iconPoint.xPoint, iconPoint.yPoint, {opacity: 0.9} ]}
                                 animation="tada" iterationCount="3">
                  <Icon active name={iconPoint.addtEval} type='MaterialIcons' style={[ globStyle.orangeCrayola, {fontSize: 21} ]}/>
                </Animatable.View>
              )}

              <View style={[ {position: 'absolute'}, {bottom: 340}, {left: 285}, {width: 55} ]}>
                <Text style={[ globStyle.orangeCrayola, {fontSize: 13}, {textAlign: 'center'} ]}>Legend-Additives</Text>
                <AdditiveLegend category="Safe" icon="check-circle" style={addtStyle} textStyle={addtTxtStyle}/>
                <AdditiveLegend category="Caution" icon="error" style={addtStyle} textStyle={addtTxtStyle}/>
                <AdditiveLegend category="Cut Back" icon="content-cut" style={addtStyle} textStyle={addtTxtStyle}/>
                <AdditiveLegend category="Avoid" icon="do-not-disturb-alt" style={addtStyle} textStyle={addtTxtStyle}/>
                <AdditiveLegend category="Banned" icon="cancel" style={addtStyle} textStyle={addtTxtStyle}/>
              </View>
              <View style={[ {position: 'absolute'}, {bottom: 340}, {left: 15} ]}>
                <RecomLegend style={globStyle.malachite} category="Recommended" icon="check-box-outline-blank"/>
                <RecomLegend style={globStyle.deepLemon} category="To Limit" icon="check-box-outline-blank"/>
                <RecomLegend style={globStyle.red} category="To Prevent" icon="check-box-outline-blank"/>
              </View>

              <View style={[ {position: 'absolute'}, {bottom: 15}, {left: 14} ]}>
                <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.antiFlashWhite, {fontSize: 14} ]}>
                  Additives Score : {" "}
                  <Text style = {[ {fontFamily: "pokemon-solid"}, {fontSize: 22} ]}>
                    {addtEvalScore}
                  </Text>
                </Text>
                <Text style={[ {textAlign: 'center'}, {fontFamily: 'righteous'}, globStyle.antiFlashWhite, {fontSize: 14} ]}>
                  Diet-disease Score : {" "}
                  <Text style = {[ {fontFamily: "pokemon-solid"}, {fontSize: 22} ]}>
                    {dietDiseEvalScore}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={[ {flex: 0.1}, {alignSelf: 'flex-end'}, {alignItems: 'center'} ]}>
                <Animatable.Image
                  source= {this.state.imageSrc}
                  style={ [ {resizeMode: 'contain'}, {height: 70}, {position: 'relative'}, {bottom: 500}, {left: 45} ]}
                  animation="jello"
                  iterationCount="infinite"
                />
              </TouchableOpacity>

              <TouchableOpacity style={[ {flex: 0.1}, {alignSelf: 'flex-end'}, {alignItems: 'center'} ]}>
                <Progress.Circle progress={this.state.progress} size={90} borderColor={this.state.progressColor} color="#F2F4F3" borderWidth={4} thickness={6} style={ [ {resizeMode: 'contain'}, {position: 'relative'}, {bottom: 450}, {left: 160} ]} />
              </TouchableOpacity>
              <Animatable.View animation="wobble" iterationCount={this.state.scanAnimIterationCnt}>
                <Button rounded
                  style={[ globStyle.charcoalFill, {textAlign: 'center'}, {width: 150}, {marginTop: 430}, {paddingLeft: 10} ]}
                  onPress={this.snap}>
                    <Text style={ [globStyle.deepLemon, {fontFamily: 'pokemon-solid'}, {letterSpacing: 2}] }>Start Scanning</Text>
                </Button>
              </Animatable.View>
              <Animatable.View animation="wobble" iterationCount={this.state.detailEvalAnimIterationCnt}>
                <Button rounded style={[ globStyle.charcoalFill, {textAlign: 'center'}, {width: 180}, {marginTop: 430}, {paddingLeft: 10} ]}
                        onPress={() => this.props.navigation.navigate('Evaluation', { ingdIdList: this.state.ingdIdList, addtEvalScore: this.state.addtEvalScore, dietDiseEvalScore: this.state.dietDiseEvalScore,
                                                                                      safeCount: this.state.safeCount, cautionCount: this.state.cautionCount, cutBackCount: this.state.cutBackCount, avoidCount: this.state.avoidCount, bannedCount: this.state.bannedCount,
                                                                                      recomCount: this.state.recomCount, limitCount: this.state.limitCount, preventCount: this.state.preventCount})}>
                    <Text style={ [globStyle.deepLemon, {fontFamily: 'pokemon-solid'}, {letterSpacing: 2}] }>Detailed Evaluation</Text>
                </Button>
              </Animatable.View>
            </View>
          </Camera>

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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({

});
