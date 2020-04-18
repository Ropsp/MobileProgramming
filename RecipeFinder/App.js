import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, Alert } from 'react-native';

export default function App() {
  const [sortIngredient, setSortIngredient] = useState('');
  const [recipe, setRecipe] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + sortIngredient;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRecipe(data.results);
    })
    .catch((err) => {
      Alert.alert('Error', err);
    });
  }

  return (
    <View style={styles.container}>
      {/* Flatlist shows title and thumbnail */}
      <FlatList 
      style = {{marginLeft: "5%"}}
      keyExtractor = {item => item.title}
      renderItem = {({item}) => 
      <View >
        <Text>{item.title}</Text>
        <Image source= {{uri: item.thumbnail}}
          style={{width: 75, height: 75}}/>
      </View>
      }      
      data={recipe}    
      />       
    

      <TextInput
      style = {{fontSize: 18, width: 200, borderColor: 'black', borderWidth: 1}} 
      value={sortIngredient} 
      onChangeText={(sortIngredient) => setSortIngredient(sortIngredient)}
      />
      <Button title="Find" onPress= {getRecipe} />
      
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
