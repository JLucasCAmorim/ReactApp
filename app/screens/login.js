import React from 'react';
import { AppRegistry, StatusBar, StyleSheet, Text, View, ListView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './components/loginForm';
import firebase from 'firebase';

export default class Login extends React.Component {
constructor(props){
    super(props);

}
componentDidMount(){
    const { navigate } = this.props.navigation;

    firebase.auth().onAuthStateChanged((user) => {
        if(user != null){
            navigate('drawerStack');
        }
    });
}

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/Octocat.png')} />
                    <Text style={styles.title}>App React Native para o Github</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm navigate={() => navigate('drawerStack')} />
                    <TouchableOpacity onPress={() => navigate('Register')} >
                        <Text style={styles.buttonText}>REGISTRAR</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>


        );
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3298db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#fff',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,

    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '700',
        paddingBottom: 50,
    }
});
AppRegistry.registerComponent('main', () => App);