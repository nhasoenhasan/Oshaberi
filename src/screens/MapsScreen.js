import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  Image
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
    

    const Profiluser = useSelector(state => state.user.user);

    return(
        <MapView
            style={{ flex: 1, width: window.width }}
            region={{
                latitude: Profiluser.latitude||-7.755322,
                longitude: Profiluser.longitude||110.381174,
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
                <Marker
                key = {item.id}
                coordinate={{
                    latitude: item.latitude||0,
                    longitude: item.longitude||0
                }}
                title={item.name} 
                description={item.name}
                >
                 <Text
               
                 >{item.name}</Text>
                <Image
                     
                      source={{uri: item.image}}
                      style={{width: 40, height: 40, borderRadius: 50}}
                    /> 
                </Marker>
                )})} 
        </MapView>
    )

}

