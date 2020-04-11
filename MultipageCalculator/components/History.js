import React from 'react';
import { Text, View,} from 'react-native';


export default function HistoryScreen({navigation, route}) {

  const {history} = route.params;

  return (
      <View
      style={{
          paddingTop: 10,
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center'
      }}>
          <Text>History</Text>
          
      {history.map((item, key)=>(
       <Text key={key}> { item } </Text>)
       )}
      
      </View>

  );

};


