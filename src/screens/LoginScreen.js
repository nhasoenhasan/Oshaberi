import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
  // AsyncStorage
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/LogoOshaburi.png';
import {Form, Thumbnail,Item, Input, Label,Button,Toast } from 'native-base';
import Geolocation from 'react-native-geolocation-service';

export default function LoginScreen(props) {
  
  const [input, setInput] = useState({ email: "", password: "",latitude:"",longitude:""});

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  const handleSubmit =async () =>{
      
      Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
      .then(async result => {
        await Db.ref('users/' + result.user.displayName).update({
          status: 'Fucking Online',
          latitude:input.longitude,
          longitude:input.longitude
        });
          
          try {
            await AsyncStorage.setItem('id', result.user.uid);
            await AsyncStorage.setItem('userPhone',result.user.uid)
            await AsyncStorage.setItem('name', result.user.displayName);
            await AsyncStorage.setItem('email', result.user.email);
            User.name=input.name;
            User.email = result.user.email;
            User.id=result.user.uid;
          } catch (e) {
            // saving error
            console.log(e);
          }
         props.navigation.navigate('App');
      })
      .catch(error => {
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          type: "danger"
        })
      });
  }

  // GET LOCATION PERMISSIONS //
  const hasLocationPermission = async () => {
    if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
    ) {
    return true;
    }
    const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
    return true;
    }
    const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
    );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
    );
    }
    return false;
  };

  useEffect( ()=>{
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                setInput({...input,latitude:position.coords.latitude,longitude:position.coords.longitude}); 
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
},[])

console.log(input)
  return(
    <View style={styles.containerSignin}>
    <Form>
      <View style={{alignItems:'center'}}>
        <Thumbnail  source={logo} style={{width:200,height:150}} />
        <Text style={{fontSize:30,fontWeight:'bold',color:'#ff826e'}}>
              Oshabiru
            </Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#ffc05f'}}>
              オシャビル
            </Text>
      </View>
      <Item floatingLabel >
        <Label>Email</Label>
        <Input 
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:8}}>
        <Label>Password</Label>
        <Input 
          placeholder="Email....."
          value={input.password}
          onChangeText={handleChange('password')}
          secureTextEntry={true}
        />
      </Item>
        <Button  onPress={handleSubmit} style={{backgroundColor:'#ff826e',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
          <Text style={{fontWeight:'bold'}}>Sign in</Text>
        </Button>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
            <Text style={{fontSize:15,marginTop:30}}>
              Don't have any account?<Text style={{fontWeight:'bold',color:'#ffc05f'}}> Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  )

}

