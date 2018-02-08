import React from 'react';
import Router from './app/routes/routes';
import { AppRegistry,StatusBar ,StyleSheet, Text, View, ListView, TextInput, TouchableHighlight } from 'react-native';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCxxi4PuA8D12dXl9vVyPicLmKXoojccwU",
  authDomain: "myproject-877a9.firebaseapp.com",
  databaseURL: "https://myproject-877a9.firebaseio.com",
  projectId: "myproject-877a9",
  storageBucket: "myproject-877a9.appspot.com",
  messagingSenderId: "1092008285454"
};


if(!firebase.apps.length){
  firebase.initializeApp(config);
}

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  render() {
    return (
      
        <View style={{ flex: 1}}>
          <Router/>
            <StatusBar blackgroundColor="#fff"
            barStyle="dark-content"/>
             
        </View>

     
     
    );
  }

   

}

