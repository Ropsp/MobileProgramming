import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert } from 'react-native';
import MyAddresses from './MyAddresses';
import MapView, { Marker } from 'react-native-maps';

export default function Map( {navigation, route} ) { 
    const {address} = route.params;

    return (
        <View>
            <Text>Address</Text>
            {address.map((item, key) => (
                <Text key={key}>{item} </Text>)
            )}
        </View>
    );
  }