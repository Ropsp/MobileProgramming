import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [AddressInput, setAddressInput] = useState('')

  const [Latitude, setLatidtude] = useState()
  const [Longitude, setLongitude] = useState()
  const [LatitudeDelta, setLatitudeDelta] = useState(0.0722)
  const [LongitudeDelta, setLongitudeDelta] = useState(0.0421)

  const [location, setLocation] = useState(0)
  const [MarkerLatitude, setMarkerLatitude] = useState(0)
  const [MarkerLongitude, setMarkerLongitude] = useState(0)

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let {status} = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission given to access location')
    } else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMarkerLatitude(location.coords.latitude)
      setMarkerLongitude(location.coords.longitude)
    }
  }
 
  const ApiKey = 'mYRCS2dCeKpWBhVQ4xiiCOQENLVWXjQ6'

  const fetchMap = async () => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + ApiKey + '&location=' + AddressInput + ',FI'

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLatidtude(data.results[0].locations[0].displayLatLng.lat)
      setLongitude(data.results[0].locations[0].displayLatLng.lng)

    }catch (error) {
      Alert.alert ('Error', error);
    }
  }
  return (
    <View style={styles.container}>
      <MapView
        style = {{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
                }}
        region= {{
          latitude: Latitude,
          longitude: Longitude,
          latitudeDelta: LatitudeDelta,
          longitudeDelta: LongitudeDelta
        }}>
          <Marker
          coordinate= {{
            latitude: MarkerLatitude,
            longitude: MarkerLongitude
          }}/>
      </MapView>
      <View>
        <TextInput
        style= {{
          width: Dimensions.get('window').width,
          borderColor: 'black',
          borderWidth: 1
        }}
        onChangeText= {(AddressInput => setAddressInput(AddressInput))}
        />
        <Button title='Show' onPress= {fetchMap}/>
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

