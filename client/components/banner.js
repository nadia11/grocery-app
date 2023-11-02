import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  ImageBackground, TouchableWithoutFeedback
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { urlFor } from '../sanity';
import { getBanners } from "../api";
export default function Banner() {
  const [banners, setBanners] = useState([]);
  useEffect(()=>{
    getBanners()
    .then(data=>{setBanners(data)})
  })
  return (
          <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal:7,
        }}
        className="overflow-visible pt-5"
       >
    {banners && banners.map(banner=>{return(
            <TouchableWithoutFeedback className="rounded">
      <View className="mr-3 rounded-md">
          <Image  className="h-36 w-20 rounded" source={{ uri: urlFor(banner.image).url()}} />
      </View>
    </TouchableWithoutFeedback>
    )})}
    </ScrollView>
  );
}