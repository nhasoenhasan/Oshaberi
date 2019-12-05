import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView 
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import {setUserlist} from '../Redux/actions/userlist';

 

export default function HomeScreen(props) {

    const styles = StyleSheet.create({
        container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        },
    }); 


    const userslist = useSelector(state => state.userlist.userlist);
    const Profiluser = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const fetchddata=async()=>{
        await Db.ref('users').on('value', result => {
            let data = result.val();
             if (data !== null) {
                let allusers = Object.values(data);
                var filteredUser = allusers.filter(
                    users => users.id !== Profiluser.id,
                );
                dispatch(setUserlist (filteredUser))
            }
        });
    }

    useEffect( ()=>{
        fetchddata()
    },[Profiluser])

    renderRow =({item})=>{
        return(
            <TouchableOpacity 
                onPress={()=>props.navigation.navigate('Chat',item)}
                style={{padding:10,borderBottomColor:'#ffc05f',borderBottomWidth:2}}>
                <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between'}}>
                <View>
                    <Text style={{fontSize:18}}>
                        {item.name}
                    </Text>
                </View>
                <View style={{justifyContent:'flex-end',flexDirection:'column',}}>
                    <Text style={{fontSize:12}}>
                        {item.status}
                    </Text>
                </View>

                </View>
            </TouchableOpacity>
        )
    }

    
    return(
        <SafeAreaView>
            <FlatList
                data={userslist}
                renderItem={renderRow}
                keyExtractor={(item)=>item.id}
            />
        </SafeAreaView>
    )

}

