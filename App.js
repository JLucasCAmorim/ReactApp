import React from 'react';
import {Drawer} from './app/routes/routes';
import { StatusBar ,StyleSheet, Text, View, ListView, TextInput, TouchableHighlight } from 'react-native';



export default class App extends React.Component {
  
  render() {
    return (
      
        <View style={{ flex: 1}}>
            <StatusBar blackgroundColor="#fff"
            barStyle="dark-content"/>
              <Drawer/>
        </View>

     
     
    );
  }

   

}

