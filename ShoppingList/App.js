import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {

  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);

  const addItem = () => {
    setData([...data, {key: item}]);
    setItem('');
  }

  const clearItem = () => {
    setData('');
  }
  return (
    <View style={styles.container}>
        <View style = {{flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', marginTop: 20}}>
          <TextInput style = {{width: 200, borderColor: 'black', borderWidth: 1}}
            onChangeText = {item => setItem(item)}/>
         </View>
         
         <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
         <Button onPress={addItem} title= "Add"/>
           <Button onPress={clearItem} title= "Clear"/>
           </View>

          <FlatList
              data={data}
              renderItem={({item}) => 
            <Text>{item.key}</Text>}/>
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
});
