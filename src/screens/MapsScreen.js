import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {Auth,Db} from '../Config/Config';
// import { stat } from 'fs';

export default function MapsScreen(props) {

    //SET STATE
    const userslist = useSelector(state => state.userlist.userlist);
    const latitude=useSelector(state=>state.user.latitude)
    const l=useSelector(state=>state.user.longitude)

     //Get All Userss
     const getAllUser = async() => {
        await getLocation()
    };

    return(
    <>
        <MapView
            style={{ flex: 1, width: window.width }} //window pake Dimensions
            region={{
                latitude:-7.5983209,
                longitude: 110.4792318,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421 
            }}         
            showsMyLocationButton={true}
            showsIndoorLevelPicker={true}
            showsUserLocation={true}
            showsCompass={true}
            showsTraffic={true}
            showsCompass={true}
            zoomControlEnabled={true}
            showsUserLocation={true}
            followsUserLocation={true}
            >
            {userslist.map((item)=>{
                return(
                <MapView.Marker
                key = {item.id}
                coordinate={{
                    latitude: item.latitude||0,
                    longitude: item.longitude||0
                }}
                title={item.name} 
                description={item.name}
                />
                )})} 
        </MapView>
     </>
    )

}

