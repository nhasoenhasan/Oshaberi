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
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChatScreen from './src/screens/ChatScreen';


const AppStack = createStackNavigator({ 
  Home: HomeScreen,
  Chat:ChatScreen,
  Profile:ProfileScreen,
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

