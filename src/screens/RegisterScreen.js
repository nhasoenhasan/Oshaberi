import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';
import logo from '../assets/image/LogoOshaburi.png';
import {Form, Item, Input, Label,Button,Thumbnail,Toast } from 'native-base';

export default function RegisterScreen(props) {
  

    const [input, setInput] = useState({ 
      name: "", 
      email: "",
      password:"",
      errorMessage: null
    });

    const handleChange = key => val =>{
        setInput({...input,[key]:val}); 
    }

    console.log(input)

  const submitForm =async () =>{
    await Auth.createUserWithEmailAndPassword(input.email.trim(), input.password)
        .then(async result => {
            let userPro = Auth.currentUser;
            await userPro.updateProfile({
                displayName:input.name,
            });
            
            console.log("SET ASYNC STORAGE",result)

            try {
              await AsyncStorage.setItem('id', result.user.uid);
              await AsyncStorage.setItem('userPhone',result.user.uid)
              await AsyncStorage.setItem('name', input.name);
              await AsyncStorage.setItem('email', result.user.email);
              User.email== result.user.email;
              User.id==result.user.uid
            } catch (e) {
              // saving error
              console.log(e);
            }
           
            //INSERT DATABASE USER
            await Db.ref('users/' + result.user.uid)
            .set({
                id: result.user.uid,
                name: input.name,
                email: input.email,
                password: input.password,
            })
            .then(async() => {
              props.navigation.navigate('Home');
            });
            
        })
        .catch(error => 
          Toast.show({
            text: error.message,
            buttonText: "Okay",
            type: "danger"
          })
        );
  }

  return(
    <View style={{padding:40,paddingTop:20}}>
      <View style={{alignItems:'center'}}>
      <Thumbnail  source={logo} style={{width:200,height:150}} />
      <Text style={{fontSize:30,fontWeight:'bold',color:'#ff826e'}}>
            Oshabiru
          </Text>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#ffc05f'}}>
            オシャビル
          </Text>
      </View>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Name</Label>
        <Input 
          value={input.name}
          onChangeText={handleChange('name')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Email</Label>
        <Input 
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Password</Label>
        <Input 
          secureTextEntry={true}
          value={input.password}
          onChangeText={handleChange('password')}
        />
      </Item>
      <Button  onPress={submitForm} style={{backgroundColor:'#ff826e',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
          <Text style={{fontWeight:'bold'}}>
            Register
          </Text>
        </Button>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
            <Text style={{fontSize:15,marginTop:30}}>
              Already have an account?
              <Text style={{fontWeight:'bold',color:'#ffc05f'}}> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  )

}

