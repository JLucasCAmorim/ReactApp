import React from 'react';
import { View, Text, Platform, PlatformIOS } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import HomeScreen  from '../index';
import AddScreen  from '../screens/add';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export const Stack1 = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: (props) => ({
      title: 'Minhas Contas',
      headerLeft: (<DrawerIcon {...props} />),
      headerRight: (<AddIcon {...props} />),
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#0087B7' }
    })
  },
  Add: {
    screen: AddScreen,
    navigationOptions: {
      headerTitle: 'Add',
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#0087B7' }
    },
  },

});

export const Drawer = DrawerNavigator({
  Home: {
    screen: Stack1,
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
  
});


 