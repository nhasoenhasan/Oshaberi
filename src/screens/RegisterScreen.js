import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';

    // RegisterScreen.navigationOptions=({navigation})=>{
    //     return{
    //         title:'Chats',
    //         header:'none'
    //     }
    // }

export default function RegisterScreen(props) {
  

    const [input, setInput] = useState({ 
      name: "", 
      email: "",
      password:"",
      errorMessage: null
    });

    const handleChange = key => val =>{
        setInput({...input,[key]:val}); 
    }

    console.log(input)

  const submitForm =async () =>{
    await Auth.createUserWithEmailAndPassword(input.email.trim(), input.password)
        .then(async result => {
            let userPro = Auth.currentUser;
            userPro.updateProfile({
                displayName:input.name,
            });
            //INSERT DATABASE USER
            await Db.ref('users/' + result.user.uid)
            .set({
                id: result.user.uid,
                name: input.name,
                email: input.email,
                password: input.password,
            })
            .then(() => {
                props.navigation.navigate('Home');
            });
        })
        .catch(error => setInput({ errorMessage: error.message }));
  }

  


  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Name...."
        style={styles.input}
        value={input.name}
        onChangeText={handleChange('name')}
      />
      <TextInput
        placeholder="Email...."
        style={styles.input}
        value={input.email}
        onChangeText={handleChange('email')}
      />
      <TextInput
        placeholder="Password...."
        style={styles.input}
        value={input.password}
        onChangeText={handleChange('password')}
      />
      <TouchableOpacity onPress={submitForm}>
        <Text style={styles.btnText}>
          Register
        </Text>
      </TouchableOpacity>

    </View>
  )

}

