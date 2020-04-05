import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [answer, setAnswer] = useState(0);

  const buttonSum = () => {
    const resultSum = parseFloat(number) + parseFloat(number1);
    setAnswer(resultSum);
  }

  const buttonSubstraction = () => {
    const resultSubstraction = parseFloat(number) - parseFloat(number1);
    setAnswer(resultSubstraction);
  }
  return (
    <View style={styles.container}>
    <View style={{flex: 0.2, flexDirection: 'column', alignItems: "center", justifyContent: 'space-around'}}>
      <Text>Result: {answer}</Text>
      <TextInput
      style={{width: 200, borderColor: 'black', borderWidth: 1}}
      onChangeText = {number => setNumber(number)}
      value= {String(number)}
      keyboardType= {'numeric'}
    />
    <TextInput
      style={{width: 200, borderColor: 'black', borderWidth: 1}}
      onChangeText = {number1 => setNumber1(number1)}
      value= {String(number1)}
      keyboardType = {'numeric'}
    />
    </View>

    <View style={{flex: 0.1, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
    <Button onPress={buttonSum} title="+"/>
    <Button onPress={buttonSubstraction} title="-"/>
    </View>

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
