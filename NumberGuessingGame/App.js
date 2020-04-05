import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {

  const [number, setNumber] = React.useState(0);
    const [answer, setAnswer] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1);

    const guess = () => {

      
      setCount(count + 1);

      if (randomNum > number) {
        setAnswer("Your guess " + number + " is too low")
      }
      else if (randomNum < number) {
        setAnswer("Your guess " + number + " is too high");
      }
      else {
        setAnswer("Your guess was correct");
        alert("You guessed the number in " + count + " guesses");
        
      }
    }

    const reset = () => {
      setCount(count - count)
      setRandomNum(Math.floor(Math.random() * 100) + 1);
    }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>Guess a number between 1-100</Text>
        <Text>{answer}</Text>
        <TextInput style= {{width: 200, borderColor: 'gray', borderWidth: 1, }} 
          onChangeText = {number => setNumber(number)}
          value ={String(number)}
          keyboardType={'numeric'}/>
      </View>
      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Button onPress={guess} title= "Make a guess"/>
      <Button onPress={reset} title= "Reset"/>
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
