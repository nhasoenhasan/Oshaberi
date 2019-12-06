import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/LogoOshaburi.png';
import {Item, Input, Label,Button,Thumbnail,Spinner} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import { setUser } from '../Redux/actions/user';


export default function RegisterScreen(props) {
    const [input, setInput] = useState({ 
      name: "", 
      email: "",
      password:"",
      errorMessage: null,
      latitude:"",
      longitude:"",
      image:'https://instagram.fjog4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/66848054_377267772989547_936657195725962670_n.jpg?_nc_ht=instagram.fjog4-1.fna.fbcdn.net&_nc_cat=103&oh=6a72311daf20ea257c467186403165cb&oe=5E80C8CF'
    });
    const[isLoading,setLoading]=useState(false);
    const dispatch = useDispatch();

    const handleChange = key => val =>{
        setInput({...input,[key]:val}); 
    }
  // // GET LOCATION PERMISSIONS //
  const hasLocationPermission = async () => {
    if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
    ) {
    return true;
    }
    const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
    return true;
    }
    const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
    );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
    );
    }
    return false;
  };

  // //GET LOCATION
  // const getLocation = async () => {
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //             setInput({...input,latitude:position.coords.latitude,longitude:position.coords.longitude}); 
  //         },
  //         (error) => {
  //             // See error code charts below.
  //             console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // }

  
  //SUBMIT DATA
  const submitForm =async () =>{
    setLoading(true);
    Auth.createUserWithEmailAndPassword(input.email.trim(), input.password)
      .then(async result => {

        let userPro = Auth.currentUser;
        await userPro.updateProfile({
          displayName:input.name,
          photoURL:input.image
        });

        dispatch(setUser(
          result.user.uid, 
          result.user.displayName,
          result.user.email,
          input.image,
          input.latitude,
          input.longitude
        ))

        //INSERT DATABASE USER
        await Db.ref('users/' + input.name)
        .set({
          id: result.user.uid,
          name: input.name,
          email: input.email,
          password: input.password,
          latitude:input.latitude,
          longitude:input.longitude,
          image:input.image,
          status:'Online'
          })  
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

  const getLocation=()=>{
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
              setInput({...input,latitude:position.coords.latitude,longitude:position.coords.longitude}); 
          },
          (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  useEffect( ()=>{
    getLocation()

  },[])

  console.log('REGISTER-----------------',input)

  return(
    <View style={{padding:40,paddingTop:20}}>
      <View style={{alignItems:'center'}}>
      <Thumbnail  source={logo} style={{width:200,height:150}} />
      <Text style={{fontSize:30,fontWeight:'bold',color:'#ff826e'}}>
            Oshabiru
          </Text>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#ffc05f'}}>
            オシャビル
          </Text>
      </View>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Name</Label>
        <Input 
          value={input.name}
          onChangeText={handleChange('name')}
          disabled={isLoading}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Email</Label>
        <Input 
          value={input.email}
          onChangeText={handleChange('email')}
          disabled={isLoading}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Password</Label>
        <Input 
          secureTextEntry={true}
          value={input.password}
          disabled={isLoading}
          onChangeText={handleChange('password')}
        />
      </Item>
      <Button  onPress={submitForm} style={{backgroundColor:'#ff826e',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
          {isLoading?<Spinner color='#FFEB00' />:<Text style={{fontWeight:'bold'}}>Register</Text>}
        </Button>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
            <Text style={{fontSize:15,marginTop:30}}>
              Already have an account?
              <Text style={{fontWeight:'bold',color:'#ffc05f'}}> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>

    </View>
  )

}

