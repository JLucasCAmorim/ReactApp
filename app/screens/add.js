import React from 'react';
import firebase  from 'firebase';
import { StyleSheet, Text, View, ListView, TextInput, TouchableHighlight, AppRegistry } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import {Select, Option} from "react-native-chooser";

export default class Add extends React.Component {
  constructor(props){
    super(props);
    
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
    
    const myFireBaseRef = firebase.database();

    this.itemsRef= myFireBaseRef.ref().child('items');


    this.state = {
      banco: 'Selecione o banco',
      agencia: '',
      conta: '',
      nome: '',
      valor: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.items = [];

  }
  
  componentDidMount(){
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({id: dataSnapshot.key, text: dataSnapshot.val()});
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });
   
    // When a todo is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
    });
  }

  addTodo(){
    if(this.state.agencia !== '' && this.state.conta !== '' && this.state.banco !== 'Selecione o banco' && this.state.nome !== '' && this.state.valor !== '' ){
      this.itemsRef.push({
        agencia: this.state.agencia,
        conta: this.state.conta,
        banco: this.state.banco,
        nome: this.state.nome,
        valor: this.state.valor,
     });
      this.setState({
        agencia: '',
        conta: '',
        banco: 'Selecione o banco',
        nome: '',
        valor: ''
      });
    }
  }
  onSelect(value, label) {
    this.setState({banco : value});
  }
  render() {
    return (
      
      <View style={styles.appContainer}>
    
      <View style={styles.inputcontainer}>
        <TextInput underlineColorAndroid='transparent'  keyboardType='numeric' style={styles.input} placeholder="Entre com a agencia" onChangeText={(text) => this.setState({agencia: text})} value={this.state.agencia}/>
      </View>
      <View style={styles.inputcontainer}>
      <TextInput underlineColorAndroid='transparent'  keyboardType='numeric' style={styles.input} placeholder="Entre com a conta " onChangeText={(text) => this.setState({conta: text})} value={this.state.conta}/>
      </View>
        <View style={styles.inputcontainer}>
        <TextInput underlineColorAndroid='transparent' style={styles.input} placeholder="Entre com o nome do titular" onChangeText={(text) => this.setState({nome: text})} value={this.state.nome}/>
        
        </View>
        <View style={styles.inputcontainer}>
        <TextInput underlineColorAndroid='transparent' keyboardType='numeric' style={styles.input}  placeholder="Entre com o valor"  onChangeText={(text) => this.setState({valor: text})} value={this.state.valor}/>
        </View>
        <View style={styles.inputcontainer}>
       <Select  onSelect = {this.onSelect.bind(this)}
            defaultText  = {this.state.banco}
            style = {{borderWidth : 1, borderColor : "#48afdb"}}
            textStyle = {{}}
            backdropStyle  = {{backgroundColor : "#d3d5d6"}}
            optionListStyle = {{backgroundColor : "#F5FCFF"}}>
          <Option value= "BB" >Banco do Brasil</Option>
          <Option value="Bradesco">Bradesco</Option>
          <Option value="Inter">Inter</Option>
          <Option value="Caixa">Caixa Econômica Federal</Option>
          <Option value="Itau">Itaú</Option>
      </Select>
        </View>
        <View style={styles.inputcontainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.addTodo()}
          underlayColor='#dddddd'>
          <Text style={styles.btnText}>Add!</Text>
        </TouchableHighlight>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
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
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    
    color: '#48BBEC'
    
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
  }
});
AppRegistry.registerComponent('main', () => App);