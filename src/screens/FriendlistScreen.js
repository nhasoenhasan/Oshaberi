import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView ,
  Image
} from 'react-native';
import User from '../../User';
import styles from '../constants/styles'; 
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {Auth,Db} from '../Config/Config';


export default function FriendlistScreen(props) {

    const styles = StyleSheet.create({
        container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        },
    }); 
    const userslist = useSelector(state => state.userlist.userlist);

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

