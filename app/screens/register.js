import React from 'react';
import { AppRegistry,StatusBar ,StyleSheet, Text, View, ListView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import RegisterForm from './components/registerForm';


export default class Register extends React.Component {
  render() {
    return (
<KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.formContainer }>
          <RegisterForm/>

     </View>
  </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#3298db'
    },
    title:{
        color: '#fff',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    buttonContainer:{
       backgroundColor: '#2980b9',
       paddingVertical: 10,
      
   },
   buttonText:{
       textAlign: 'center',
       color: '#ffffff',
       fontWeight: '700',
       paddingBottom: 50,
   }
   });
AppRegistry.registerComponent('register', () => Register);