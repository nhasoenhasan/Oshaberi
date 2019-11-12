import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  // componentWillMount(){
  //   // Your web app's Firebase configuration
  //   var firebaseConfig = {
  //     apiKey: "AIzaSyCpkbAkUFHbNvwm-Qb1mGAUMVNm0_DKnTw",
  //     authDomain: "oshaberi-90914.firebaseapp.com",
  //     databaseURL: "https://oshaberi-90914.firebaseio.com",
  //     projectId: "oshaberi-90914",
  //     storageBucket: "oshaberi-90914.appspot.com",
  //     messagingSenderId: "184308163527",
  //     appId: "1:184308163527:web:2c55ba9e9d97dba48dafe2",
  //     measurementId: "G-RQYRHNB1FW"
  //   };
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  // }
  // Fetch the token from storage then navigate to our appropriate place
  
  // _bootstrapAsync = async () => {
  //   User.phone = await AsyncStorage.getItem('userPhone');
  //   this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  // };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
} 3