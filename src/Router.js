import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail} from 'native-base';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import MapsScreen from './screens/MapsScreen';
import FriendlistScreen from './screens/FriendlistScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const DashboardTabNavigator = createMaterialTopTabNavigator({
  Friends: HomeScreen,
  // Friend:FriendlistScreen,
  Maps:MapsScreen},{
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        
      },
      tabStyle: {
        alignItems:'center',
        justifyContent:'center',
      },
      style: {
        backgroundColor: '#ff826e',
      },
    },
  },
  
  );

const AppStack = createStackNavigator({ 
  Dashboard:{screen:DashboardTabNavigator,
    navigationOptions:({navigation})=>( {
      headerTitle:()=>(
        <Text style={{marginHorizontal:'6%',fontSize:20,color:'white',fontWeight:'bold'}}>Oshaberi</Text>
      ),
      headerStyle: {
        backgroundColor: '#ff826e',
      },
      headerRight:(
      <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Icon type="FontAwesome"  size={20} name="gear" style={{paddingRight:20,color:'white'}}  />
      </TouchableOpacity>
      )
    })
    
  },
  Chat: ChatScreen,
  Profile:{screen:ProfileScreen,
    navigationOptions:({navigation})=>( {
      headerStyle: {
        backgroundColor: '#ff826e',
      }
    })
  },
});

const AuthStack = createStackNavigator({ 
  Login: LoginScreen, 
  Register:RegisterScreen,
  },{
    defaultNavigationOptions: {
      header: null
    } 
  }
  );

const Router= createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(Router);

