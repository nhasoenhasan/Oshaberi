import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Auth,Db} from '../Config/Config';

export default function MapsScreen(props) {

    //SET STATE
    const [users,setUsers]=useState({
        users: [],
        uid: '',
        region: {
            latitude: -7.7585007,
            longitude: 110.378115,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    });

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

     //Get All Users
     const getAllUser = async() => {
        const id = await AsyncStorage.getItem('id');

        console.log("ID",id)

        Db.ref('users').on('value', result => {
            let allusers = Object.values(result);
            console.log("ALL USERS",id)
        //   if (data !== null) {

        //     setUsers({...Input,
        //         region:{
        //             latitude: allusers.user.latitude,
        //             longitude: allusers.user.longitude,
        //         }}
        //     )
        //   }
        });
    };



    useEffect( ()=>{
        getAllUser()
    },[])


    console.log(users)
    return(   
    <MapView
        style={{ flex: 1, width: window.width }} //window pake Dimensions
        region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 
         }} 
         
         >
     <MapView.Marker
        coordinate={{
           latitude: -7.7584987,
           longitude:  110.3781332,
        }}
        title="Lokasi"
        description="Hello" />
     </MapView>

     
        
    )

}

