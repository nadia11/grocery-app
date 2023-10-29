import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView,ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import * as Location from 'expo-location';
import BottomNavigator from '../bottomNavigation'
export default function LogInScreen(){
      const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
    //      let regionName = await Location.reverseGeocodeAsync({
    //     accuracy: location.accuracy,
    //     altitude:location.altitude,
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //   },useGoogleMaps);
      setLocation(location);
      console.log(location);
    })();
  }, []);

    let text;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
    return(
      <View>
      <Text>{text}</Text>
      {/* <BottomNavigator></BottomNavigator> */}
     </View>
    )

}