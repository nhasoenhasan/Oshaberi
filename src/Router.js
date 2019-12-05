import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import {Thumbnail} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import MapsScreen from './screens/MapsScreen';
import FriendlistScreen from './screens/FriendlistScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const DashboardTabNavigator = createMaterialTopTabNavigator({
  Message: HomeScreen,
  Friend:FriendlistScreen},{
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        
      },
      tabStyle: {
        alignItems:'center',
        justifyContent:'center',
      },
      style: {
        backgroundColor: '#ff826e',
      },
    },
  },
  
  );

const AppStack = createStackNavigator({ 
  Dashboard:{screen:DashboardTabNavigator,
    navigationOptions:({navigation})=>( {
      headerStyle: {
        backgroundColor: '#ff826e',
      },
      headerRight:(
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Thumbnail 
          small 
          source={{uri: 'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png'}}
          style={{marginRight:10}}
          />
      </TouchableOpacity>
      )
    })
  },
  Chat: ChatScreen,
  Profile:{screen:ProfileScreen,
  },
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

