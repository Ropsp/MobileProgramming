import React, {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import {Button, Header, Input, ThemeProvider, ListItem} from 'react-native-elements';

export default function App() {

  const [amount, setAmount] = useState('');
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const db = SQLite.openDatabase('shoppingdb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, amount text, item text);');
   });
   updateList();
  }, []);

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoppinglist (amount, item) values (?, ?);', [amount, item]);
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
      setItems(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoppinglist where id = ?;', [id]);
    }, null, updateList
    )
  }

 
  return (
    <ThemeProvider>
      <Header
        centerComponent={{text: 'Shopping List', style: {color: 'white', fontSize: 20}}}
      />

      <Input style = {{marginTop: 20, width: 200, borderColor: 'black', borderWidth: 1}}
          label='Item'
          placeholder='Item to buy'
          onChangeText = {(item) => setItem(item)} 
          value={item}/>

       <Input style = {{marginTop: 20, width: 200, borderColor: 'black', borderWidth: 1}}
          label='Amount'
          placeholder='Amount'
          onChangeText = {(amount) => setAmount(amount)} 
          value={amount}/>
   
        <Button onPress={saveItem} title= "Add"/>

        <View>
          {
            items.map((item, i) => (
              <ListItem
              key= {i}
              title={item.item}
              subtitle={item.amount}
              bottomDivider
              rightSubtitle={<Text style={{color: 'blue'}}>In cart</Text>}
              chevron
              onPress={() => deleteItem(item.id)}
              />
            ))
          }
            </View>        
    </ThemeProvider>
       
);
}


