import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  // AsyncStorage
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';


export default function LoginScreen(props) {
  
  LoginScreen.navigationOptions=({navigation})=>({
    header:null
  });

  const [input, setInput] = useState({ phone: "", name: ""});

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  useEffect(()=>{
    AsyncStorage.getItem('userPhone').then(val=>{
        if(val){
          setInput({...input, phone:val })
        }
      }
    )
  },[])

  const submitForm =async () =>{
    if(input.phone.length < 10){
      Alert.alert('Error','Wrong Phone')
    }else if(input.name.length<3){
      Alert.alert('Error','Wrong Name')
    }else{
      await AsyncStorage.setItem('userPhone',input.phone)
      firebase.database().ref('users/'+input.phone).set({name:input.name});
      User.phone=input.phone
      props.navigation.navigate('App');
    }
  }


  return(
    <View style={styles.container}>
      <TextInput
        placeholder="phone number"
        keyboardType="number-pad"
        style={styles.input}
        value={input.phone}
        onChangeText={handleChange('phone')}
      />
      <TextInput
        placeholder="name"
        style={styles.input}
        value={input.name}
        onChangeText={handleChange('name')}
      />
      <TouchableOpacity onPress={submitForm}>
        <Text style={styles.btnText}>
          Login
        </Text>
      </TouchableOpacity>

    </View>
  )

}

