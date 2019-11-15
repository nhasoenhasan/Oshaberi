import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from 'react-native';
import User from '../../User';
import styles from '../constants/styles';
import { TextInput  } from 'react-native-gesture-handler';
import firebase from 'firebase'; 
import AsyncStorage from '@react-native-community/async-storage';
import { setUserNull } from '../Redux/actions/user';
ProfileScreen.navigationOptions={
    title:'Profile'
}

export default function ProfileScreen(props) {
    const [input, setInput]=useState({name:''})

    const Profiluser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const handleChange=key=>val=>{
        setInput({...input,[key]:val});
    }

    const changeName= async()=>{
        if(input.name.lenght < 3){
            Alert.alert('Error','Please Enter')
        }else if(Profiluser.name !== input.name){
            firebase.database().ref('users').child(User.phone).set({name:input.name});
            Profiluser.name=input.name;
            alert.alert('Succes','Changed Name Succesful');
        } 
    }

    const deleteToken = async () => {
        dispatch(setUserNull());
        firebase.auth().signOut();
        props.navigation.navigate('Auth')
    }

    
    console.log(input)
    // const name = AsyncStorage.getItem('name');
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.btnText}>
                {Profiluser.name}
            </Text>
            <TextInput
                style={styles.input}
                value={Profiluser.name}
                onChangeText={handleChange('name')}
            />
            <TouchableOpacity onPress={deleteToken}>
                <Text style={styles.btnText}>LogOut</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )

}

