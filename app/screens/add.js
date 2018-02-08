import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, ListView, TextInput, TouchableHighlight, AppRegistry, Picker, Alert } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'


export default class Add extends React.Component {
  state = {
    banco: 'Selecione o banco',
    agencia: '',
    conta: '',
    nome: '',
    valor: '',
    todoSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
  };
  constructor(props){
    super(props)
    this.items = [];
    const myFireBaseRef = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.carregaDados(myFireBaseRef, user.uid);
      }
    });
    
  }
  
  carregaDados = (myFireBaseRef, userId) => {
    this.itemsRef = myFireBaseRef.ref('users/' + userId).child('items');

    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({ id: dataSnapshot.key, text: dataSnapshot.val() });
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });
  }
  addTodo() {
    if (this.state.agencia !== '' && this.state.conta !== '' && this.state.banco !== 'Selecione o banco' && this.state.nome !== '' && this.state.valor !== '') {
      this.itemsRef.push({
        agencia: this.state.agencia,
        conta: this.state.conta,
        banco: this.state.banco,
        nome: this.state.nome,
        valor: this.state.valor,
      });
      Alert.alert(
        'Conta Adicionada',
        'A conta foi adicionada com sucesso!',
        [

          {
            text: 'OK', onPress: () => this.setState({
              agencia: '',
              conta: '',
              banco: 'Selecione o banco',
              nome: '',
              valor: ''
            })
          },
        ],
        { cancelable: false }
      )


    }
  }
  onSelect(value, label) {
    this.setState({ banco: value });
  }
  render() {
    return (

      <View style={styles.appContainer}>


        <TextInput placeholderTextColor='#000000' autoFocus underlineColorAndroid='transparent' keyboardType='numeric' style={styles.input} placeholder="Entre com a agência" onChangeText={(text) => this.setState({ agencia: text })} value={this.state.agencia} />


        <TextInput placeholderTextColor='#000000' underlineColorAndroid='transparent' keyboardType='numeric' style={styles.input} placeholder="Entre com a conta " onChangeText={(text) => this.setState({ conta: text })} value={this.state.conta} />


        <TextInput placeholderTextColor='#000000' underlineColorAndroid='transparent' style={styles.input} placeholder="Entre com o nome do titular" onChangeText={(text) => this.setState({ nome: text })} value={this.state.nome} />



        <TextInput placeholderTextColor='#000000' underlineColorAndroid='transparent' keyboardType='numeric' style={styles.input} placeholder="Entre com o valor" onChangeText={(text) => this.setState({ valor: text })} value={this.state.valor} />


        <Picker
          selectedValue={this.state.banco}
          itemStyle={styles.items}
          style={styles.select}
          onValueChange={(value, label) => this.setState({ banco: value })}>
          <Picker.Item label="Selecione o banco" value="Selecione o banco" />
          <Picker.Item label="Banco do Brasil" value="BB" />
          <Picker.Item label="Bradesco" value="Bradesco" />
          <Picker.Item label="Inter" value="Inter" />
          <Picker.Item label="Caixa Econômica Federal" value="Caixa" />
          <Picker.Item label="Itaú" value="Itau" />
        </Picker>


        <View style={styles.inputcontainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addTodo()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>ADICIONAR</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  inputcontainer: {
    marginTop: 5,
    
    flexDirection: 'row'
  },
  button: {
    height: 40,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10
  },
  select: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    paddingHorizontal: 10

  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  },
  items: {
    fontSize: 12,
  }
});
AppRegistry.registerComponent('Add', () => Add);