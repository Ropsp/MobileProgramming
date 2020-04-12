import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, AsyncStorage } from 'react-native';

export default function App() {

    const [number, setNumber] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [count, setCount] = React.useState('');
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1);
    const [hs, setHs] = React.useState(''); //Highscore

    const guess = () => {

      if (randomNum > number) {
        setAnswer("Your guess " + number + " is too low")
        setCount(count + 1);

      }
      if (randomNum < number) {
        setAnswer("Your guess " + number + " is too high");
        setCount(count + 1);

      } 
      if (randomNum == number) {
        Alert.alert("You guessed the number in " + count + " guesses");
        newHighscore();
        showHighscore()
        reset();
       }  
    }

    const reset = () => {
      setNumber('');
      setCount(1);
      setRandomNum(Math.floor(Math.random()*100)+1);
    }

    const newHighscore = async () =>  {
     let score = count;
     let highscore = score;
     let previousHighscore = await AsyncStorage.getItem('highscore')
     if (previousHighscore > score) {
       AsyncStorage.setItem('highscore', (highscore))
     }
    };

    const showHighscore = async () => {
      try {
        let highscore = await AsyncStorage.getItem('highscore')
        setHs(highscore);
      }
      catch(err) { 
        alert(err);
      }
     }

    

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
        <Text>Guess a number between 1-100</Text>

        <Text>{answer}</Text>

        <TextInput style= {{width: 200, borderColor: 'gray', borderWidth: 1, }} 
          onChangeText = {number => setNumber(number)}
          value ={number}
          keyboardType='numeric'/>
      </View>
      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Button onPress={guess} title= "Make a guess"/>
      
        </View>
        <View>
          <Text>
            Highscore: {hs}
          </Text>
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
