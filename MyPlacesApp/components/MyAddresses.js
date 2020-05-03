import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { Button, ThemeProvider, Input, ListItem } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('addressdb.db');

export default function MyAddresses({navigation}) {
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists addresslist (id integer primary key not null, address text);');
        });
        updateList();
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into addresslist (address) values (?);', [address]);
        }, null, updateList
        )
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from addresslist;', [], (_, {rows}) =>
            setAddresses(rows._array)
            );
        });
    }

     const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from addresslist where id = ?;', [id]);
        }, null, updateList
        )
    }
    return(
        <ThemeProvider>
            <Input
            label='Address'
            placeholder='Type address here'
            style={{marginTop: 30, fontSize: 12, width: 200}}
            onChangeText={(address) => setAddress(address)}
            value={address}
            />
            <Button
            buttonStyle={{marginHorizontal: '1%', width: 350, backgroundColor: "gray"}}
            titleStyle={{color: 'white', fontSize: 15}}
            type="outline"
            onPress={saveItem} 
            title="Save" />

            <View>
                {
                    addresses.map((item, i) => (
                        <ListItem
                        key={i}
                        title={item.address}
                        bottomDivider
                        rightSubtitle={<Text style={{color:"#808080"}}>show on map</Text>}
                        chevron
                        onPress={() => navigation.navigate('Map', {address : address})}
                        onLongPress={() => deleteItem(item)}
                        />
                    ))
                }
            </View>
        </ThemeProvider>
    );
}