import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import MapsScreen from './screens/MapsScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const DashboardTabNavigator = createMaterialTopTabNavigator({
  Home: HomeScreen,
  Maps:MapsScreen,
  Profile:ProfileScreen,
});

const AppStack = createStackNavigator({ 
  DashboardTabNavigator,
  Chat: ChatScreen,
});



const AuthStack = createStackNavigator({ 
  Login: LoginScreen, 
  Register:RegisterScreen,
  },{
    defaultNavigationOptions: {
      header: null
    } 
  }
  );

const Router= createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(Router);

