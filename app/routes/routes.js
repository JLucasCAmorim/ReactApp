import React from 'react';
import { View, Text, Platform, PlatformIOS, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import HomeScreen  from '../index';
import AddScreen  from '../screens/add';
import RegisterScreen  from '../screens/register';
import LoginScreen  from '../screens/login';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logout from '../screens/components/logout';


const DrawerIcon = ({navigation}) => {
  if(Platform.OS == 'ios'){
    return null;
  }
  
  return(
    <Ionicons
          name="md-menu"
          size={28}
          color= "white"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
 
  );
}
const AddIcon = ({navigation}) => {
  return(
    <Ionicons
          name="md-add"
          size={28}
          color= "white"
          style={{ paddingRight: 20 }}
          onPress={() => navigation.navigate('Add')}
        />
 
  );
}

const LoginStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: (props) => ({
      title: 'Login',
      headerLeft: null,
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#0087B7' }
    })
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: (props) => ({
      title: 'Registro',
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#0087B7' }
    })
  },

});

const DrawerNavigation = StackNavigator({
  DrawerStack: { 
    screen: HomeScreen, 
    navigationOptions: (props) => ({
    title: 'Minhas Contas',
    headerLeft: (<DrawerIcon {...props} />),
    headerRight: (<AddIcon {...props} />),
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#0087B7' }
  }) },
  Add: {
     screen: AddScreen,
     navigationOptions: (props) => ({
      title: 'Adicionar Conta',
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#0087B7' }
    })
    }
 });

const DrawerStack = DrawerNavigator({
  Home: {
    screen: DrawerNavigation ,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: 'Logout',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-close' : 'ios-close-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
});


const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerStack }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
});


export default PrimaryNav

const styles = StyleSheet.create({
   
  buttonContainer:{
      backgroundColor: '#2980b9',
      paddingVertical: 10
  },
  buttonText:{
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '700'
  }
 
 });
 