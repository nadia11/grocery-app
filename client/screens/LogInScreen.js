
import {View, StyleSheet, Image, Text, Linking,TouchableOpacity, Button} from 'react-native';
import {
  TextInput,
  TouchableRipple,
  Checkbox,
  Snackbar,
  ActivityIndicator, Dialog, Paragraph, Portal, Divider,
} from 'react-native-paper';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import {vh, vw} from 'react-native-expo-viewport-units';
import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { themeColors } from '../theme'
import BottomNavigator from '../bottomNavigation';
import {Constants} from 'expo'
import { User } from 'react-native-feather';
export default function LogInScreen(){
  const userName =useRef(null);
  const[user,setUser]=useState("");
  const navigation=useNavigation();
  const handleLogin=()=>{
      const name = userName.current.value;
  storeUser(name);
  }
  const storeUser = async (value) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(value));
    // const x=await AsyncStorage.getItem("user");
    // console.log("hello"+JSON.parse(x))
    await navigation.navigate("Home");
  } catch (error) {
    console.log(error);
  }
};
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
                textContentType="telephoneNumber"
                 value={userName}
                ref={userName}
                  onChangeText={(e) => userName.current.value = e}
                 onSubmitEditing={() => console.log(userName.current.value)}
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
height: '40%', alignItems:'center', justifyContent:'center', marginBottom:5}} className="border-2 rounded" onPress={()=>handleLogin()}>
  {/* <Icon.Facebook></Icon.Facebook> */}
<Text className="text-center text-white">LogIn </Text>
</TouchableOpacity>
    	<TouchableOpacity style={{bordeRadius: '19px',backgroundColor: '#166332',width:'100%',
height: '40%', alignItems:'center', justifyContent:'center',color:'white'}} className="border-2 rounded" onPress={()=>navigation.navigate("Home")}>
<Text className="text-center text-white p-5">Sign Up</Text>
</TouchableOpacity>
  </View>
  <Text className="text-center text-white p-5">{user}</Text>
</View>
</View>
    )

}