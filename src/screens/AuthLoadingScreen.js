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

  render() {
    return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
    );
  }
} 3