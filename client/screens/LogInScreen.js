
import {View, StyleSheet, Image, Text, Linking,TouchableOpacity} from 'react-native';
import {
  TextInput,
  Button,
  TouchableRipple,
  Checkbox,
  Snackbar,
  ActivityIndicator, Dialog, Paragraph, Portal, Divider,
} from 'react-native-paper';
// @ts-ignore
import {vh, vw} from 'react-native-expo-viewport-units';
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import BottomNavigator from '../bottomNavigation';
export default function LogInScreen(){
  const navigation=useNavigation();
  const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: 'white'
  },
  container: {
    flex: 1,
    height: "100%",
    paddingHorizontal: vw(5),
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingTop: vh(20)
  },
  medicianLog: {
    resizeMode: "center",
    height: vh(15),
  },
  textInputs: {
    paddingTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: vw(45) - 115
  },

  button: {
    margin: 10,
    width: 100,
  },
  center: {
    alignItems: "center",
  },
  forgotPass: {
    color: "blue",
    textDecorationLine: "underline"
  }
})
type AvoidingViewProps = {
  children: React.ReactNode;
};

const TextInputAvoidingView = ({children}: AvoidingViewProps) => {
  return (
    <>{children}</>
  );
};

    return(
<View style="flex-1">
    <Image source={require('../assets/login.png')} style={{height:'50%',width:'100%', marginBottom:100}}/>
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <View style={{width:'80%'}}>

            <TextInputAvoidingView>
              <TextInput
                style={styles.textInputs}
                autoCorrect={false}
                mode="outlined"
                label="Username"
                keyboardType="number-pad"
                textContentType="telephoneNumber"
                placeholder="012345678901"
                // value={username}
                onChangeText={text => console.log(text)}
              />
              <TextInput
                style={styles.textInputs}
                secureTextEntry={false}
                mode="outlined"
                label="Password"
                // value={password}
                onChangeText={text => console.log(text)}
                right={
                  <TextInput.Icon
                    name="eye"
                    onPressIn={() => {
                      console.log("text")
                    }}
                    onPressOut={() => {
                      console.log("text")
                    }}
                  />
                }
              />
            </TextInputAvoidingView>
          </View>
          <View>
            {/*FIXME - Need to toggle*/}
            <TouchableRipple onPress={() => setKeepLoggedIn(keepLoggedIn)}>
              <View style={styles.center}>
                <View style={styles.row}>
                  <Text>Keep me logged in</Text>
                  <View pointerEvents="none">
                    {/*FIXME - Need to enable*/}
                    <Checkbox disabled={true} color="red" status="checked"/>
                  </View>
                </View>
              </View>
            </TouchableRipple>
          </View>
          <View style={{justifyContent:'flex-end'}}>
    	<TouchableOpacity style={{bordeRadius: '19px',backgroundColor: '#5383EC',width:'100%',
height: '40%', alignItems:'center', justifyContent:'center', marginBottom:5}} className="border-2 rounded" onPress={()=>navigation.navigate("Home")}>
  {/* <Icon.Facebook></Icon.Facebook> */}
<Text className="text-center text-white     ">Sign in with Facebook </Text>
</TouchableOpacity>
    	<TouchableOpacity style={{bordeRadius: '19px',backgroundColor: '#166332;',width:'100%',
height: '40%', alignItems:'center', justifyContent:'center'}} className="border-2 rounded" onPress={()=>navigation.navigate("Home")}>
<Text className="text-center text-white p-5">Sign Up</Text>
</TouchableOpacity>
  </View>
</View>
</View>
    )

}