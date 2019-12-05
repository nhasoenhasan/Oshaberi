import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from '../constants/styles';
import { TextInput  } from 'react-native-gesture-handler';
import firebase from 'firebase'; 
import { setUserNull } from '../Redux/actions/user';
import {Button,Toast,Input,Item,Label,Icon,Thumbnail} from 'native-base';
import {Auth,Db} from '../Config/Config';
// import Icon from 'react-native-vector-icons/FontAwesome';


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

    return(
        <View>
        
        <SafeAreaView style={{
            paddingTop:'20%',
            justifyContent:'center',
            alignItems:'center',
            padding:'15%'
        }}>
            <Image  
                source={{uri:'https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png'}} 
                style={{width:145,height:145,borderRadius:100,marginBottom:'10%'}}
            />
            <Item floatingLabel style={{marginBottom:'10%'}}>
                 <Label>Name</Label>
                <Input 
                    value={Profiluser.name} 
                    onChangeText={handleChange('name')}
                />
                 <Icon name='pencil' type='FontAwesome' style={{fontSize:17}} active />
            </Item>
            
            <Item floatingLabel >
                 <Label>Email</Label>
                <Input 
                    value={Profiluser.email} 
                />
                <Icon name='envelope-o' type='FontAwesome' style={{fontSize:17}} active />
            </Item>
            <Button danger onPress={deleteToken} style={{marginTop:'10%',width:'100%',justifyContent:'center',backgroundColor:'#ff826e'}}>
                <Text style={{color:'white',fontWeight:'bold'}}> Logout </Text>
            </Button>
        </SafeAreaView>
        <View style={{position:'absolute',marginLeft:'56%',paddingTop:'53%'}}>
            <TouchableOpacity style={{backgroundColor:'#ff826e',width:47,alignItems:'center',height:45,borderRadius:19,justifyContent:'center'}}>
                <Icon name="camera" size={30} style={{color:'white'}} />
            </TouchableOpacity>
        </View>
        </View>
    )

}

