import React,{useState} from 'react';
import {View,Text,SafeAreaView,TextInput,TouchableOpacity} from 'react-native';
import AuthLoadingScreen from './AuthLoadingScreen';
import styles from '../constants/styles'
import User from '../../User';
import firebase from 'firebase';


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


    handleChange=key=>val=>{
        setPerson({...person, textMessage:val})
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
            setPerson({textMessage:''});
        }
    }
    return(
        <SafeAreaView>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    value={person.textMessage}
                    onChangeText={handleChange('textMessage')}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Text style={styles.btnText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}