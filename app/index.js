import React from 'react';
import firebase  from 'firebase';
import { StyleSheet, Text, View, ListView, TextInput, TouchableHighlight, AppRegistry, Image, Alert } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

export default class Index extends React.Component {
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
      agencia: '',
      conta: '',
      banco: '',
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

  
  removeTodo(rowData){
    Alert.alert(
      'Deletar Conta',
      'Você tem certeza que deseja deletar essa conta?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () =>this.itemsRef.child(rowData.id).remove()},
      ],
      { cancelable: false }
    )
    
  }

  

  render() {
    return (
      <View style={styles.appContainer}>
       
       <ListView
        dataSource={this.state.todoSource}
        renderRow={this.renderRow.bind(this)} />
    
     
      
    </View>
    );
  }
  renderRow(rowData) {
    if(rowData.text.banco == "BB"){
      this.image = require('./images/BB.jpg');
    }
    else if(rowData.text.banco == "Bradesco"){
      this.image = require('./images/bradesco.jpg');
    }
    else if(rowData.text.banco == "Inter"){
      this.image = require('./images/Inter.jpg');
    }
    else if(rowData.text.banco == "Itau"){
      this.image = require('./images/itau.jpg');
    }
    else if(rowData.text.banco == "Caixa"){
      this.image = require('./images/Caixa.jpg');
    }
    return (
      <Card containerStyle={{padding: 0, paddingBottom: 4}}  image={this.image} >
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(rowData)}>
        <View>
        <View style={styles.row}>
            <Text style={styles.todoText}> {rowData.text.nome}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.todoText}>Agencia: {rowData.text.agencia}</Text>
           
          </View>
          <View style={styles.row}>
          <Text style={styles.todoText}>Conta: {rowData.text.conta}</Text>
            </View>
            
            <View style={styles.row}>
            <Text style={styles.todoText}>Valor: {rowData.text.valor}</Text>
            </View>
            
        </View>
       
      </TouchableHighlight>
      </Card>
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