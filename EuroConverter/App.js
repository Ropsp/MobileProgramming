import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Picker, Button } from 'react-native';
import { getARMatrices } from 'expo/build/AR';

export default function App() {

  const [currencyRates, setCurrencyRates] = useState([])
  const [amount, setAmount] = useState('')
  const [chosenCurrency, setChosenCurrency] = useState('')
  const [result, setResult] = useState('')
  const [index, setIndex] = useState('')

  useEffect(() => {
    getRates();
  }, []);

  const getRates = async () => {
    const url = 'http://data.fixer.io/api/latest?access_key=3bdb7370296d13abf4c2c95ca95b093e'

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCurrencyRates(data.rates);
    } catch (error) {
      Alert.alert('Error', error);
    }
  }

  const convert = () => {
    const calculate = (Number(amount) / Number(chosenCurrency)).toFixed(2)
    setResult(calculate + ' €')
  }
  
  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 30}}>{result}</Text>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'}}>

          <TextInput style = {{
            width: 50,
            borderColor: 'black',
            borderWidth: 1
          }}
          onChangeText = {(amount) => setAmount(amount)}
          keyboardType = 'numeric'
          />

          <Picker
            selectedValue = {chosenCurrency}
            style = {{height: 50, width: 100}}
            onValueChange = {(itemValue, itemIndex) =>{
              setChosenCurrency(itemValue);
              setIndex(itemIndex);
            }}>
              {Object.keys(currencyRates).map((i) => {
                return <Picker.Item label = {i} value = {currencyRates[i]} key = {index} />
              })}
            </Picker>
              
            
        </View>
        <Button onPress = {convert} title = 'Convert'></Button>
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
