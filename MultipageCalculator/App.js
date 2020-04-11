import { StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from './components/History';
import CalculatorScreen from './components/CalculatorScreen';

const Stack = createStackNavigator();




export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="CalculatorScreen"
            component={CalculatorScreen}
            options={{title: 'Calculator'}}
          />
          <Stack.Screen 
            name="HistoryScreen"
            component={HistoryScreen}
            options={{title: 'History'}}
          />
        </Stack.Navigator>
    </NavigationContainer>
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


