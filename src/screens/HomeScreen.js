import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView 
} from 'react-native';
import User from '../../User';
import styles from '../constants/styles'; 
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';

    HomeScreen.navigationOptions={
        title:'Chats'
    }

export default function HomeScreen(props) {

    const [users, setUsers] = useState({ users: ""});

    const styles = StyleSheet.create({
        container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        },
    }); 

    useEffect(()=>{
        let dbref=firebase.database().ref('users');
        dbref.on('child_added',(val)=>{
            let person =val.val();
            person.phone=val.key;
            setUsers((prevState)=>{
                return{
                    users:[...prevState.users,person]
                }
            })
        })
    },[])

    const _logOut=async()=>{
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    }


    renderRow =({item})=>{
        return(
            <TouchableOpacity 
                onPress={()=>props.navigation.navigate('Chat',item)}
                style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView>
            <FlatList
                data={users.users}
                renderItem={renderRow}
                keyExtractor={(item)=>item.phone}
            />
        </SafeAreaView>
    )

}

