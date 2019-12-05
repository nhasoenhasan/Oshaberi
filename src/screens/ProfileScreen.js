import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import User from '../../User';
import styles from '../constants/styles';
import { TextInput  } from 'react-native-gesture-handler';
import firebase from 'firebase'; 
import AsyncStorage from '@react-native-community/async-storage';
import { setUserNull } from '../Redux/actions/user';
import { Thumbnail,Icon,Button,Toast} from 'native-base';
import {Auth,Db} from '../Config/Config';

ProfileScreen.navigationOptions={
    title:'Profile',
    headerStyle: {
        backgroundColor: '#ff826e',
    },
}

export default function ProfileScreen(props) {
    const [input, setInput]=useState({name:''})

    const Profiluser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const handleChange=key=>val=>{
        setInput({...input,[key]:val});
    }

    const changeName= async()=>{
        await Db.ref('users/' + Profiluser.name)
        .update({
            name:input.name
        });
        Toast.show({
            text: "Succes Change name",
            type: "success"
          })
    }

    const deleteToken = async () => {
        dispatch(setUserNull());
        await Db.ref('users/' + Profiluser.name)
        .update({
            status:'Offline'
        });
        firebase.auth().signOut();

        props.navigation.navigate('Auth')
    }

    // useEffect( ()=>{
    //     setInput({...input,name:Profiluser.name})
    // },[])


    console.log(input.name)
    return(
        <View>
        
        <SafeAreaView style={{
            paddingTop:50,
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Image  
                source={{uri:'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png'}} 
                style={{width:125,height:125,borderRadius:100,marginBottom:50}}
            />
            <Text style={{
                fontSize:20
            }}>
                {Profiluser.name}
            </Text>
            <Text style={{
                fontSize:17,
                margin:10,
                color:'#ff826e'
            }}>
                {Profiluser.email}
            </Text>
            <TextInput
                style={styles.input}
                value={Profiluser.name}
                onChangeText={handleChange('name')}
            />
            <Button success onPress={changeName} style={{padding:20,backgroundColor:'#ffc05f',borderRadius:20}}>
            <Text>Change Name</Text>
          </Button>
            <TouchableOpacity onPress={deleteToken} style={{justifyContent:'center',alignItems:'center'}}>
                <Text>Logout
                    <Icon type="FontAwesome" name="sign-in" />
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
        <View style={{position:'absolute',marginLeft:'66%',paddingTop:150}}>
            <Icon type="FontAwesome" name="camera-retro" />
        </View>
        </View>
    )

}

