import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View,Dimensions,Text,SafeAreaView,Keyboard,TextInput,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import AuthLoadingScreen from './AuthLoadingScreen';
import styles from '../constants/styles'
import User from '../../User';
import { FlatList } from 'react-native-gesture-handler';
import {Auth,Db} from '../Config/Config';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {Item, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

ChatScreen.navigationOptions=({navigation})=>{
    
    return{
        headerTitle:()=>(
            <View style={{marginLeft:20}}>
                <Text style={{fontSize:20,color:'white'}}>{navigation.getParam('name',null)}</Text>
                {navigation.getParam('status',null)==='Offline'?
                    <Text style={{fontSize:13,fontWeight:'500',color:'red'}}>{navigation.getParam('status',null)}</Text>
                :
                    <Text style={{fontSize:13,fontWeight:'500',color:'green'}}>{navigation.getParam('status',null)}</Text>
                }
            </View>
        ),
        headerStyle: {
            backgroundColor: '#ff826e',
        },
        headerLeft:()=>(
                <Thumbnail 
                small 
                source={{uri: navigation.getParam('image',null)}}
                style={{marginLeft:20}}
                />
        )
    }
}


export default function ChatScreen(props) {
    // const [Message, setMessage] = useState({ textMessage: ''});
    const [person, setPerson]=useState({
        name:props.navigation.getParam('name'),
        id:props.navigation.getParam('id'),
        textMessage: ''
    })

    const [keyboard, setKeyboard]=useState({
        keyboardOffset:0
    })

    const [message,setMessageList]=useState({
        messageList:[]
    })

    const Profiluser = useSelector(state => state.user.user);

    const getMessage=async()=>{
        firebase.database().ref('messages')
        .child(Profiluser.id)
        .child(person.name)
            .on('child_added',(value)=>{
                setMessageList((prevState)=>{
                return{
                    messageList:[...prevState.messageList,value.val()]
                }
            })
        })
    }

    const keyboardDidShow= event=>{
        setKeyboard({
            keyboardOffset:event.endCoordinates.height,
        })
    }

    const keyboardDidHide= event =>{
        setKeyboard({
            keyboardOffset:0
        })
    }

    //KeyBoard Setting
    useEffect(()=>{
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', keyboardDidShow
          );
          const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', keyboardDidHide
          );
      
          return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
          };
    })

    

    useEffect(()=>{
        getMessage()
    },[])

   const handleChange=key=>val=>{
        setPerson({ ...person, [key]: val });
    }

   const convertTime=(time)=>{
        let d=new Date(time);
        let c= new Date();
        let result=(d.getHours()<10 ? '0':'')+d.getHours()+':';
        result +=(d.getMinutes()<10?'0':'')+d.getMinutes();
        if(c.getDay()!==d.getDay()){
            result=d.getDay()+''+d.getMonth()+''+result;
        }
        return result;
    }

    const sendMessage=async()=>{
        if(person.textMessage.length>0){
            let msgId=firebase.database().ref('message').child(Profiluser.id).child(person.name).push().key;
            let updates={};
            let message={
                message:person.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from:person.name
            }
            updates['messages/'+Profiluser.id+'/'+person.name+'/'+msgId]=message;
            updates['messages/'+person.id+'/'+ Profiluser.name+'/'+msgId]=message;
            firebase.database().ref().update(updates);
            // setPerson({textMessage:''});
            setPerson({ ...person, textMessage: '' });
        }
    }

    renderRow=({item})=>{
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf:item.from==person.name?'flex-end':'flex-start',
                backgroundColor:item.from===person.name?'#3096e1':'#ffc05f',
                borderRadius:5,
                marginBottom:10 
            }}>
                <Text style={{color:'#fff',padding:7,fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee',padding:3,fontSize:12}}>
                    {convertTime(item.time)}
                </Text>
            </View>
        )
    }

    let {height,width}=Dimensions.get('window');
    return(
        <SafeAreaView>
            <FlatList
                style={{padding:10,height:height*0.80 }}
                data={message.messageList}
                renderItem={renderRow}
                keyExtractor={(item, index)=>index.toString()}
            />
             
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput 
                    style={{
                        width:280,
                        bottom:keyboard.keyboardOffset,
                        backgroundColor:'white',
                        borderWidth:1,
                        borderColor:'#ccc',
                        borderRadius:20
                    }}
                    value={person.textMessage}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={handleChange('textMessage')}
                />
                <TouchableOpacity onPress={sendMessage} style={{backgroundColor:'#ff826e',borderRadius:20,width:50,height:45,marginLeft:12,alignItems:'center',bottom:keyboard.keyboardOffset}} >
                    
                    <Icon type="FontAwesome"  size={25} name="send" style={{padding:9,color:'white'}}  />
                    
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}