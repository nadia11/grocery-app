import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { Feather, Entypo } from "@expo/vector-icons";
import { getDishes } from "../api";

export default function SearchScreen() {

  const [searchPhrase, setSearchPhrase] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation();
  const [dishes,setDishes] = useState([]);

useEffect(()=>{
getDishes()
.then(res=>setDishes(res))
.catch(e=>console.log(e));
})
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" currentHeight={20} />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 py-4">
        <View className="flex-row flex-1 items-center p-3 rounded-sm border border-gray-300">
          <TextInput
            placeholder="Search Grocery"
            className="ml-2 flex-1"
            keyboardType="default"
            value={searchPhrase}
            onChangeText={text=>{setSearchPhrase(text.toLowerCase())}}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {clicked && (
            <Entypo
              name="cross"
              size={20}
              color="black"
              style={{ padding: 1 }}
              onPress={() => {
                setSearchPhrase("");
              }}
            />
          )}
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.Search height="25" width="25" stroke="gray" />
          </View>
        </View>
      </View>
     <Text>{dishes.map(dish=>{return(<Text>{dish.name.toLowerCase().includes(searchPhrase) && searchPhrase!=""?dish.name.toLowerCase():""}</Text>)})}</Text>
      <Text>{searchPhrase}</Text>
    </SafeAreaView>
  );
}
