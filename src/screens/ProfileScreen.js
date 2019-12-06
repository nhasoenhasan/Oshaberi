import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import firebase from 'firebase'; 
import { setUserNull } from '../Redux/actions/user';
import {Button,Toast,Input,Item,Label,Icon,Thumbnail, Spinner} from 'native-base';
import {Auth,Db} from '../Config/Config';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { setUser } from '../Redux/actions/user';
// import Icon from 'react-native-vector-icons/FontAwesome';


ProfileScreen.navigationOptions={
    headerTitle:()=>(
        <Text style={{fontSize:25,color:'white'}}>Profile</Text>
    ),
    headerStyle: {
        backgroundColor: '#ff826e',
    },
}

export default function ProfileScreen(props) {
    const [input, setInput]=useState({name:''})
    const [ uploadingImage,setuploadingImage]=useState(false)
    const [logOutloading,setlogOutloading]=useState(false)
    
    const Profiluser = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    let url=Profiluser.image
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
        setlogOutloading(true)
        dispatch(setUserNull());
        await Db.ref('users/' + Profiluser.name)
        .update({
            status:'Offline'
        });
        firebase.auth().signOut();

        props.navigation.navigate('Auth')
    }

    const submitImage=()=>{
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                setuploadingImage(true)
                uploadFile(response)
                    .then(response => response)
                    .then(result => {
                        setuploadingImage(false)
                    })
            }
        });
    }

    const uploadFile=async (file)=> {
        const source = {uri: 'data:image/jpeg;base64,' + file.data};
        const data = new FormData();
        data.append('file', source.uri);
        data.append('upload_preset', 'oshaberi');
    
        //DO UPLOAD IMAGE
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/nhasoen/image/upload',
            {
            method: 'POST',
            body: data,
            },
        );

        const fileupload = await res.json();
       
        //UPDATE IMAGE IN FIREBASE
        await Db.ref('users/' + Profiluser.name)
        .update({
            image:fileupload.secure_url
        });

        //DISPATCH REDUX
        await dispatch(setUser(
            Profiluser.id, 
            Profiluser.name,
            Profiluser.email,
            fileupload.secure_url
          ))

        return fileupload
    }

    console.log('>>>>',Profiluser.image)
    
    return(
        <View>
            
            {logOutloading?
             <View style={{
                paddingTop:'60%',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Spinner color='#ff826e' style={{fontSize:50}} />
                <Text disabled={logOutloading} >Logout....</Text>
            </View>
             :
             <View>
            <SafeAreaView style={{
                paddingTop:'20%',
                justifyContent:'center',
                alignItems:'center',
                padding:'15%'
            }}>
            
                
                {uploadingImage ? 
                <Spinner color='#ff826e' style={{width:145,height:145,borderRadius:100,marginBottom:'10%'}} /> 
                : 
                <Image 
                        source={{uri:Profiluser.image}} 
                        style={{width:145,height:145,borderRadius:100,marginBottom:'10%'}}
                />}
            <Item floatingLabel style={{marginBottom:'10%'}}>
                 <Label>Name</Label>
                <Input 
                    value={Profiluser.name} 
                    onChangeText={handleChange('name')}
                    disabled={true}
                />
                 <Icon name='pencil' type='FontAwesome' style={{fontSize:17}} active />
            </Item>
            
            <Item floatingLabel >
                 <Label>Email</Label>
                <Input 
                    value={Profiluser.email} 
                    disabled={true}
                    />
                <Icon name='envelope-o' type='FontAwesome' style={{fontSize:17}} active />
            </Item>
            <Button danger onPress={deleteToken} style={{marginTop:'10%',width:'100%',justifyContent:'center',backgroundColor:'#ff826e'}}>
                <Text style={{color:'white',fontWeight:'bold'}}> Logout </Text>
            </Button>
        </SafeAreaView>
        <View style={{position:'absolute',marginLeft:'56%',paddingTop:'53%'}} disabled={uploadingImage}>
            <TouchableOpacity onPress={submitImage} style={{backgroundColor:'#ff826e',width:47,alignItems:'center',height:45,borderRadius:19,justifyContent:'center'}}>
                <Icon name="camera" size={30} style={{color:'white'}} />
            </TouchableOpacity>
        </View>
        </View>
        }
        </View>
    )
        
}


