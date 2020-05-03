import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MyAddresses from './components/MyAddresses';
import Map from './components/Map';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name='MyAddresses'
        component={MyAddresses}
        options={{title: 'My Addresses'}}
        />

        <Stack.Screen
        name='Map'
        component='Map'
        option={{title: 'Map'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}