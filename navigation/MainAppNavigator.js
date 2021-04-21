import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RegistAccScreen from '../screens/RegistAccScreen';
import RegistAccProfileScreen from '../screens/RegistAccProfileScreen';
import RegistAccHealthScreen from '../screens/RegistAccHealthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AugmentedRealityScreen from '../screens/AugmentedRealityScreen';
import EvaluationScreen from '../screens/EvaluationScreen';
import HistoricalEvalScreen from '../screens/HistoricalEvalScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import UpdateHealthScreen from '../screens/UpdateHealthScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    RegistAcc: RegistAccScreen,
    RegistAccProfile: RegistAccProfileScreen,
    RegistAccHealth: RegistAccHealthScreen,
    Dashboard: DashboardScreen,
    AugmentedReality: AugmentedRealityScreen,
    Evaluation: EvaluationScreen,
    HistoricalEval: HistoricalEvalScreen,
    Onboarding: OnboardingScreen,
    UpdateHealth: UpdateHealthScreen
  },
  {
    initialRouteName: "Onboarding"
  });

export default createAppContainer(AppStack);
