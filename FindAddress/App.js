import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [AddressInput, setAddressInput] = useState('')

  const [Latitude, setLatidtude] = useState(37.78825)
  const [Longitude, setLongitude] = useState(-122.4324)
  const [LatitudeDelta, setLatitudeDelta] = useState(0.0322)
  const [LongitudeDelta, setLongitudeDelta] = useState(0.0721)
 
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
        style = {{flex: 1,
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
            latitude: Latitude,
            longitude: Longitude
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
