import React,{useState,useEffect} from 'react';
import {View,Dimensions,Text,SafeAreaView,TextInput,TouchableOpacity} from 'react-native';
import AuthLoadingScreen from './AuthLoadingScreen';
import styles from '../constants/styles'
import User from '../../User';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';


ChatScreen.navigationOptions=({navigation})=>{
    return{
        title:navigation.getParam('name',null)
    }
}

export default function ChatScreen(props) {
    // const [Message, setMessage] = useState({ textMessage: ''});
    const [person, setPerson]=useState({
        name:props.navigation.getParam('name'),
        phone:props.navigation.getParam('phone'),
        textMessage: ''
    })

    const [message,setMessageList]=useState({
        messageList:[]
    })

    useEffect(()=>{
        firebase.database().ref('messages').child(User.phone).child(person.phone)
            .on('child_added',(value)=>{
                setMessageList((prevState)=>{
                    return{
                        messageList:[...prevState.messageList,value.val()]
                    }
                })
            })
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

    sendMessage=async()=>{
        if(person.textMessage.length>0){
            let msgId=firebase.database().ref('message').child(User.phone).child(person.phone).push().key;
            let updates={};
            let message={
                message:person.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from:User.phone
            }
            updates['messages/'+User.phone+'/'+person.phone+'/'+msgId]=message;
            updates['messages/'+person.phone+'/'+ person.phone+'/'+msgId]=message;
            firebase.database().ref().update(updates);
            // setPerson({textMessage:''});
            setPerson({ ...person, textMessage: '' });
        }
    }

    console.log(person)
    renderRow=({item})=>{
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf:item.from==User.phone?'flex-end':'flex-start',
                backgroundColor:item.from===User.phone?'#00897b':'#7cb324',
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
                style={{padding:10,height:height*0.8}}
                data={message.messageList}
                renderItem={renderRow}
                keyExtractor={(item, index)=>index.toString()}
            />
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    value={person.textMessage}
                    onChangeText={handleChange('textMessage')}
                />
                <TouchableOpacity onPress={sendMessage} style={{paddingBottom:10,marginLeft:5}}>
                    <Text style={styles.btnText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}