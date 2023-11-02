import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView,ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ImageScreen(){
        const navigation = useNavigation();
  useEffect(()=>{getUser()})
    return(
<Text style="height:500">{userName}</Text>
    );
}