import React,{useState,useEffect} from 'react';
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
import fireabse from 'firebase'; 
import AsyncStorage from '@react-native-community/async-storage';

ProfileScreen.navigationOptions={
    title:'Profile'
}

export default function ProfileScreen(props) {
    const [input, setInput]=useState({name:User.name})

    const handleChange=key=>val=>{
        setInput({...input,[key]:val});
    }

    console.log(input)
    const changeName= async()=>{
        console.log("Hai")
        if(input.name.lenght < 3){
            Alert.alert('Error','Please Enter')
        }else if(User.name !== input.name){
            firebase.database().ref('users').child(User.phone).set({name:input.name});
            User.name=input.name;
            alert.alert('Succes','Changed Name Succesful');
        } 
    }

    const deleteToken = async () => {
        await AsyncStorage.removeItem('userPhone')
        props.navigation.navigate('Auth')
    }

    // const _logOut=async()=>{
    //     await AsyncStorage.clear();
    //     props.navigation.navigate('Auth');
    // }
    return(
        <SafeAreaView style={styles.container}>
            <Text>
                {User.phone}
            </Text>
            <TextInput
                style={styles.input}
                value={input.name}
                onChangeText={handleChange('name')}
            />
            <TouchableOpacity onPress={deleteToken}>
                <Text style={styles.btnText}>LogOut</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )

}

