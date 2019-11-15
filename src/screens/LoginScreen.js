import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/LogoOshaburi.png';
import { setUser } from '../Redux/actions/user';
import { setLoading } from '../Redux/actions/loading';
import {Form, Thumbnail,Item, Input, Label,Button,Toast,Spinner } from 'native-base';
import Geolocation from 'react-native-geolocation-service';

export default function LoginScreen(props) {
  
  const [input, setInput] = useState({ 
    email: "", 
    password: "",
    latitude:"",
    longitude:""});
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
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

  //GET LOCATION
  const getLocation = async () => {
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
  }


  //SUBMIT FORM
  const handleSubmit =async () =>{
    await getLocation()
    Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
    .then(async result => {
        await Db.ref('users/' + result.user.displayName).update({
          status: 'Fucking Online',
          latitude:input.latitude,
          longitude:input.longitude
        });
        dispatch(setUser(
          result.user.uid, 
          result.user.displayName,
          result.user.email
        ))
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
          disabled={isLoading}
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:8}}>
        <Label>Password</Label>
        <Input 
          disabled={isLoading}
          placeholder="Email....."
          value={input.password}
          onChangeText={handleChange('password')}
          secureTextEntry={true}
        />
      </Item>
        <Button  onPress={handleSubmit} style={{backgroundColor:'#ff826e',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
           {isLoading ? <Spinner color='#FFEB00' /> : <Text style={{fontWeight:'bold'}}>Sign in</Text>}
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

