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

export default function MapsScreen(props) {

    //SET STATE
    const [users,setUsers]=useState({
        userslist: [],
        uid: '',
    });
    const [geolalitude,setGeolatitude]=useState();
    const [geolongitude,setGeolongitude]=useState();

    const Profiluser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    // // GET LOCATION PERMISSIONS //
    // const hasLocationPermission = async () => {
    //     if (
    //     Platform.OS === 'ios' ||
    //     (Platform.OS === 'android' && Platform.Version < 23)
    //     ) {
    //     return true;
    //     }
    //     const hasPermission = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     );
    //     if (hasPermission) {
    //     return true;
    //     }
    //     const status = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //     );
    //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
    //     return true;
    //     }
    //     if (status === PermissionsAndroid.RESULTS.DENIED) {
    //     ToastAndroid.show(
    //         'Location Permission Denied By User.',
    //         ToastAndroid.LONG,
    //     );
    //     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //     ToastAndroid.show(
    //         'Location Permission Revoked By User.',
    //         ToastAndroid.LONG,
    //     );
    //     }
    //     return false;
    // };


  //GET LOCATION
//   const getLocation = async () => {
//     if (hasLocationPermission) {
//       Geolocation.getCurrentPosition(
//           (position) => {
//               setGeolatitude(position.coords.latitude); 
//               setGeolongitude(position.coords.longitude); 
//           },
//           (error) => {
//               console.log(error.code, error.message);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     }
//   }

     //Get All Users
     const getAllUser = async() => {
        // await getLocation()
        await  Db.ref('users').on('value', result => {
           let data= result.val();
        if (data !== null) {
            let allusers = Object.values(data);
            const filteredUser = allusers.filter(
                users => users.id !== Profiluser.id,
            );
            setUsers({users,
                userslist: filteredUser
            }
        )
        }
    });
    };

    useEffect( ()=>{
        getAllUser()
    },[])

    return(   
    <MapView
        style={{ flex: 1, width: window.width }} //window pake Dimensions
        region={{
            latitude:-7.7585086,
            longitude:110.3781415,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 
        }}         
        
        showsCompass={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
         >
        {users.userslist.map((item,index)=>{
           
            return(
             <Marker
             key = {index}
             coordinate={{
                 latitude: item.latitude,
                 longitude: item.longitude
             }}
             title={item.name} />
             )
         })} 
     </MapView>

     
        
    )

}

