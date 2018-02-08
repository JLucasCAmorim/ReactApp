import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, ListView, TextInput, TouchableHighlight, AppRegistry, Image, Alert, ActivityIndicator } from 'react-native';
import { Card, ListItem, Button, SearchBar } from 'react-native-elements';



export default class Index extends React.Component {
  state = {
    agencia: '',
    conta: '',
    banco: '',
    nome: '',
    valor: '',
    text: '',
    todoSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
  }
  constructor(props) {
    super(props);

    const myFireBaseRef = firebase.database();
    this.items = [];
    
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

    // When a todo is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
      this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });

    });
  }


  removeTodo(rowData) {
    Alert.alert(
      'Deletar Conta',
      'Você tem certeza que deseja deletar essa conta?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => this.itemsRef.child(rowData.id).remove() },
      ],
      { cancelable: false }
    )

  }

  filterSearch(text) {
    const newData = this.items.filter(function (item) {

      const itemData = item.text.nome;

      const textData = text;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      todoSource: this.state.todoSource.cloneWithRows(newData),
      text: text
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
     
        <SearchBar
          lightTheme
          inputStyle={{ color: '#fff' }}
          onChangeText={(text) => this.filterSearch(text)}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Digite aqui...' />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.todoSource}
          renderRow={this.renderRow.bind(this)} />

      </View>
    );
  }
  renderRow(rowData) {
    if (rowData.text.banco == "BB") {
      this.image = require('./images/BB.jpg');
    }
    else if (rowData.text.banco == "Bradesco") {
      this.image = require('./images/bradesco.jpg');
    }
    else if (rowData.text.banco == "Inter") {
      this.image = require('./images/Inter.jpg');
    }
    else if (rowData.text.banco == "Itau") {
      this.image = require('./images/itau.jpg');
    }
    else if (rowData.text.banco == "Caixa") {
      this.image = require('./images/Caixa.jpg');
    }
    return (
      <Card containerStyle={{ padding: 0, paddingBottom: 4 }} image={this.image} >
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
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  appContainer: {
    flex: 1,
    paddingBottom: 20
  },
  titleView: {
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText: {
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
AppRegistry.registerComponent('home', () => home);
