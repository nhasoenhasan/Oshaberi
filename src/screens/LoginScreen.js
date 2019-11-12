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
import {Auth,Db} from '../Config/Config';

export default function LoginScreen(props) {
  
  // LoginScreen.navigationOptions=({navigation})=>({
  //   header:null
  // });

  const [input, setInput] = useState({ email: "", password: ""});

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  // useEffect(()=>{
  //   AsyncStorage.getItem('userPhone').then(val=>{
  //       if(val){
  //         setInput({...input, phone:val })
  //       }
  //     }
  //   )
  // },[])

  // const submitForm =async () =>{
  //   if(input.phone.length < 10){
  //     Alert.alert('Error','Wrong Phone')
  //   }else if(input.name.length<3){
  //     Alert.alert('Error','Wrong Name')
  //   }else{
  //     await AsyncStorage.setItem('userPhone',input.phone)
  //     firebase.database().ref('users/'+input.phone).set({name:input.name});
  //     User.phone=input.phone
  //     props.navigation.navigate('App');
  //   }
  // }

  const handleSubmit =async () =>{
    Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
      .then(async result => {
        await Db.ref('users/' + result.user.uid).update({
          status: 'online',
        });

        try {
          await AsyncStorage.setItem('id', result.user.uid);
          await AsyncStorage.setItem('userPhone',result.user.uid)
          await AsyncStorage.setItem('name', result.user.displayName);
          await AsyncStorage.setItem('email', result.user.email);
          User.email== result.user.email;
          User.id==result.user.uid
        } catch (e) {
          // saving error
          console.log(e);
        }
        props.navigation.navigate('App');
      })
      .catch(error => {
      console.log(error);
    });

  }

  console.log(input)

  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Email....."
        style={styles.input}
        value={input.email}
        onChangeText={handleChange('email')}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={input.password}
        onChangeText={handleChange('password')}
      />
      <TouchableOpacity style={{marginBottom:20}}>
        <Text style={styles.btnText} onPress={handleSubmit}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
        <Text style={styles.btnText}>
          Register
        </Text>
      </TouchableOpacity>

    </View>
  )

}

