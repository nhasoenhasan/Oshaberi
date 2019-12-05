import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import styles from '../constants/styles';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/LogoOshaburi.png';
import { setUser } from '../Redux/actions/user';
import {Form, Thumbnail,Item, Input, Label,Button,Toast,Spinner } from 'native-base';

export default function LoginScreen(props) {
  
  const [input, setInput] = useState({ 
    email: "", 
    password: "",
    latitude:"",
    longitude:""});
  // const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();
  const [isLoading,setLoading]=useState(false);

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  //SUBMIT FORM
  const handleSubmit =async () =>{
    // await getLocation()
    setLoading(true);
    Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
    .then(async result => {
        await Db.ref('users/' + result.user.displayName).update({
          status: 'Online',
        });
        dispatch(setUser(
          result.user.uid, 
          result.user.displayName,
          result.user.email
        ))
        setLoading(false)
        props.navigation.navigate('App');
      })
      .catch(error => {
        setLoading(false)
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      });
  }

  return(
    <View style={styles.containerSignin}>
    <Form>
      <View style={{alignItems:'center'}}>
        <Thumbnail  source={logo} style={{width:200,height:150}} />
        <Text style={{fontSize:30,fontWeight:'bold',color:'#ff826e'}}>
              Oshabiru
            </Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#ffc05f'}}>
              オシャビル
            </Text>
      </View>
      <Item floatingLabel >
        <Label>Email</Label>
        <Input 
          disabled={isLoading}
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:8}}>
        <Label>Password</Label>
        <Input 
          disabled={isLoading}
          placeholder="Email....."
          value={input.password}
          onChangeText={handleChange('password')}
          secureTextEntry={true}
        />
      </Item>
        <Button  onPress={handleSubmit} style={{backgroundColor:'#ff826e',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
           {isLoading ? <Spinner color='#FFEB00' /> : <Text style={{fontWeight:'bold'}}>Sign in</Text>}
        </Button>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
            <Text style={{fontSize:15,marginTop:30}}>
              Don't have any account?<Text style={{fontWeight:'bold',color:'#ffc05f'}}> Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </View>
  )

}

