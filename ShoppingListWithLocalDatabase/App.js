import React, {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

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
    <View style={styles.container}>
        
      <TextInput style = {{marginTop: 20, width: 200, borderColor: 'black', borderWidth: 1}}
          placeholder='Item to buy'
          onChangeText = {(item) => setItem(item)} 
          value={item}/>

       <TextInput style = {{marginTop: 20, width: 200, borderColor: 'black', borderWidth: 1}}
          placeholder='Amount'
          onChangeText = {(amount) => setAmount(amount)} 
          value={amount}/>
   
        <Button onPress={saveItem} title= "Save"/>

        <Text style={{marginTop: 10, fontSize: 25}}>Shopping list</Text>

        <FlatList
          keyExtractor={item => item.id.toString()}
             renderItem={({item}) => 
            <View style= {styles.listContainer}>
            <Text>{item.item}, {item.amount}</Text>
            <Text style={{fontSize: 15, color: 'blue'}} onPress={()=> deleteItem(item.id)}> bought</Text></View>}
            data={items} 
            />         
        
          </View> 
      
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

