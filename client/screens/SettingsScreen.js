import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView,ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SettingsScreen(){
        const navigation = useNavigation();
        const [userName,setUserName]=useState("");
        const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const currentUser = JSON.parse(savedUser);
      console.log(currentUser);
      setUserName(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{getUser()})
    return(
<Text style="height:500">{userName}</Text>
    );
}