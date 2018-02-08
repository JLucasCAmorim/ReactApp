import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, ListView, TextInput, TouchableOpacity, Image } from 'react-native';
import HomeScreen from '../../index';
import firebase from 'firebase';
import Loader from './loader';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            email: '',
            password: '',
            loading: false
        });


    }

    loginUser = (email, password) => {
      
        const { navigate } = this.props

        try {

            firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
               
                    navigate();
                 
              
               

            });

        } catch (error) {
            console.log(error.toString())
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Loader
                    loading={this.state.loading} />
                <TextInput
                    placeholder="Username ou Email"
                    returnKeyType="next"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                />
                <TextInput
                    placeholder="Senha"
                    returnKeyType="go"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    underlineColorAndroid='transparent'
                    style={styles.input}
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.loginUser(this.state.email, this.state.password)} >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700'
    }

});
