import {
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity, KeyboardAvoidingView, ScrollView,
} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  TextInput,
  TouchableRipple,
  Checkbox,
  Snackbar,
  ActivityIndicator,
  Dialog,
  Paragraph,
  Portal,
  Divider, Button
} from "react-native-paper";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vh, vw } from "react-native-expo-viewport-units";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import BottomNavigator from "../bottomNavigation";
import { Constants } from "expo";
import { User } from "react-native-feather";
export default function LogInScreen() {
  const userName = useRef(null);
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    const name = userName.current.value;
    storeUser(name);
  };
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
      color: "white",
    },
    container: {
      flex: 1,
      height: "100%",
      alignItems: 'center',
      justifyContent:'center'
      // paddingTop: vh(20)
    },
    medicianLog: {
      resizeMode: "center",
      height: vh(15),
    },
    textInputs: {
      marginVertical:5
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    buttonRow: {
      flexDirection: "column",
      alignItems: "center"
    },

    button: {
      margin: 10,
      width: 100,
       backgroundColor: "#166332",
    },
    center: {
      alignItems: "center",
    },
    forgotPass: {
      color: "blue",
      textDecorationLine: "underline",
    },
  });
  type AvoidingViewProps = {
    children: React.ReactNode,
  };

  const TextInputAvoidingView = ({ children }: AvoidingViewProps) => {
    return <>{children}</>;
  };

  return (
    <View style="flex-1">
      <Image
        source={require("../assets/login.png")}
        style={{ height: "40%", width: "100%", marginBottom:40}}
      />


        <View style={{marginHorizontal:40}}>
          <TextInputAvoidingView>
            <TextInput
              style={styles.textInputs}
              autoCorrect={false}
              mode="outlined"
              label="Username"
              value={userName}
              ref={userName}
              onChangeText={(e) => (userName.current.value = e)}
              onSubmitEditing={() => console.log(userName.current.value)}
            />
        <TextInput
              style={styles.textInputs}
              autoCorrect={false}
              mode="outlined"
              value={"Password"}
              onChangeText={(e) => console.log(userName.current.value)}
              onSubmitEditing={() => console.log(userName.current.value)}
            />
          </TextInputAvoidingView>
        </View>
        <View>
          <TouchableRipple onPress={() => setKeepLoggedIn(keepLoggedIn)}>
            <View style={styles.center}>
              <View style={styles.row}>
                <Text>Keep me logged in</Text>
                <View pointerEvents="none">
                  <Checkbox disabled={true} color="red" status="checked" />
                </View>
              </View>
            </View>
          </TouchableRipple>
        </View>
        {/* <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              bordeRadius: "19px",
              backgroundColor: "#166332",
              width: "100%",
              height: "30%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 5,
              paddingHorizontal: 10,
            }}
            className="border-2 rounded"
            onPress={() => handleLogin()}
          >
            <Text className="text-center text-white px-5">Log In </Text>
          </TouchableOpacity>
          <Text className="text-center text-black px-5">Or </Text>
            <Text className="text-center text-white p-5" style={{color:"#166332"}} onPress={() => navigation.navigate("Home")}>Sign Up</Text>
        </View> */}
          <View style={styles.buttonRow}>
            <Button mode="contained" onPress={()=>handleLogin()}
                    style={styles.button}>
              Login
            </Button>
          <Text className="text-center text-white" style={{color:"#166332"}} onPress={() => navigation.navigate("Home")}>Sign Up</Text>
          </View>
    </View>

  );
}
