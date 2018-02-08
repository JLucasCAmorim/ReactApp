import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, ListView, TextInput, TouchableHighlight, AppRegistry, Image, Alert } from 'react-native';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
     }

    componentWillMount() {
        const { navigate } = this.props.navigation;
        firebase.auth().signOut().then(function() {
       
            navigate('Login');
        
    })
    }
    render() {
        return(
            <View>
                
            </View>
        );
      }
}
