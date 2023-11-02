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
import { urlFor } from "../sanity";

export default function SearchScreen() {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    getDishes()
      .then((res) => setDishes(res))
      .catch((e) => console.log(e));
  });
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="light-content" currentHeight={20} />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 py-4">
        <View className="flex-row flex-1 items-center p-3 rounded-xl border-4 border-green-800">
          <TextInput
            placeholder="Search Grocery"
            className="ml-2 flex-1"
            keyboardType="default"
            value={searchPhrase}
            onChangeText={(text) => {
              setSearchPhrase(text.toLowerCase());
            }}
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
      <View className="mt-5">
            <ScrollView>
        {dishes.map((dish) => {
          return dish.name.toLowerCase().includes(searchPhrase) &&
            searchPhrase != "" ? (
            <View
              style={{ shadowColor: themeColors.bgColor(0.1), shadowRadius: 5, flex:1, flexDirection:'row',marginStart:25}}
              className="mr-6 bg-white rounded shadow-md mb-5 w-80"
            >
              <Image
                className="h-100 rounded-t-3xl"
                source={{ uri: urlFor(dish.image).url() }} style={{flex:0.4}}
              />
              <View className="px-3 pb-4 space-y-2" style={{flex:0.6}}>
                <Text className="text-lg font-bold pt-2 text-center">
                  {dish.name.toLowerCase()}
                </Text>
                 <Text className="text-sm font-bold pt-2 text-center">
                  {dish.price+" tk "+dish.amount +" "}
                </Text>
              </View>
            </View>
  
          ) : null;
        })}
  </ScrollView>
      </View>
    </SafeAreaView>
  );
}
