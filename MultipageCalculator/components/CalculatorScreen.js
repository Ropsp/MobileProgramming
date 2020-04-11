import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import History from './History';

export default function CalculatorScreen({navigation}) {

    

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [answer, setAnswer] = useState('');
    const [history, setHistory] = useState([]);


    const plusCount = () => {

      const resultPlus = parseFloat(first) + parseFloat(second);
      setAnswer(resultPlus);

      const operation = first + ' + ' + second + ' = ' + resultPlus;
      history.push(operation);
      
      


    }

    const minusCount = () => {

      const resultMinus = parseFloat(first) - parseFloat(second);
      setAnswer(resultMinus);

      const operation = first + ' - ' + second + ' = ' + resultMinus;
      history.push(operation);
      
      

    }


  return (
    <View
          style={{
          flex: 0.6, 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'space-around', 
          marginTop: 50
      }} >

        <Text 
                style={{textAlign:'center', fontSize: 18}}>
                Answer: {answer}
        </Text>
      
      <TextInput style= {{width: 200, borderColor: 'gray', borderWidth: 1 }} 
      onChangeText = {first => setFirst(first)}
      defaultValue ={first}
      keyboardType='numeric'
      />

      <TextInput style= {{width: 200, borderColor: 'gray', borderWidth: 1 }} 
          onChangeText = {second => setSecond(second)}
          defaultValue ={second}
          keyboardType='numeric'
        />
      
      <View style={{paddingTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Button onPress={plusCount} title= "+"/>

        <Button onPress={minusCount} title= "-"/>

        <Button 
         title='History' 
         onPress={() => navigation.navigate('HistoryScreen', {history: history})}/>
      </View>
    
    </View>
  );

  }
 
