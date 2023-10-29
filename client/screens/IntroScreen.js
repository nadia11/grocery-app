import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView,ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
export default function IntroScreen(){
        const navigation = useNavigation();
    useEffect(()=>{
      setTimeout(()=>{navigation.navigate('Login')},3000);
    })
    return(
        <ImageBackground style={{width:'100%', height:'100%', flex:1, justifyContent:'center',alignItems:'center'}}  source={require('../assets/images/intro.jpg')}>
                 <Image source={require('../assets/GroceryIcon.jpg')} className="h-8 w-12 rounded-sm" />
        <Text style={{color: '#FFF',textAlign:'center', fontSize:36, fontWeight:'800'}}>FreshFind</Text>
        </ImageBackground>
    );
}