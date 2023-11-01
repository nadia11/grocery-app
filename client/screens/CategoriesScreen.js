import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView, TouchableOpacity
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Categories from "../components/categories";
import FeatureRow from "../components/featuredRow";
import { getFeaturedResturants } from "../api";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import BottomNavigator from "../bottomNavigation";
import * as Location from "expo-location";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";

export default function CategoriesScreen() {
      const [featuredCategories, setFeaturedCategories] = useState([]);
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [currentAdress, setCurrentAdress] =useState("Dhaka, Bangladesh");
  const [adresses, setAdresses] =useState([]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const myApiKey = "AIzaSyAFtczNTP-B_sg8avMgIVEkwsEwIdlaMXY";
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  useEffect(() => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        location?.coords?.latitude +
        "," +
        location?.coords?.longitude +
        "&key=" +
        myApiKey
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setAdresses(responseJson.results);
      });
  }, [location]);

  let text = "NewYork, Times";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    getFeaturedResturants().then((data) => {
      setFeaturedCategories(data);
    });
  }, []);
    return(
<SafeAreaView>
       <StatusBar barStyle="light-content" currentHeight={20} />
      <View className="flex-row items-center px-4 pb-2 py-4 mt-2">
        <View className="flex-row flex-1 items-center p-3 rounded-sm border border-gray-300 justify-end">
          <View className="flex-row items-center">
            <Icon.MapPin height="20" width="20" stroke="gray" onPress={openMenu} color={themeColors.bgColor(1)}/>
            <Text className="text-gray-600 mr-4">{currentAdress}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                        <TouchableOpacity style={{backgroundColor: themeColors.bgColor(1)}} className="p-3 rounded-full" onPress={openMenu}>
                <Icon.Edit height={10} width={10} strokeWidth="2.5" stroke="white" /></TouchableOpacity>}
              >{adresses.map(adress=>{return(   <View>
                <Menu.Item onPress={() => {setCurrentAdress(adress.formatted_address)}} title={adress.formatted_address} />
                      <Divider />
                      </View>)
              })}
              </Menu>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Categories />

        {setFeaturedCategories && (
          <View className="mt-5">
            {featuredCategories?.map((category) => {
              return (
                <FeatureRow
                  key={category._id}
                  id={category._id}
                  title={category.name}
                  restaurants={category?.restaurants}
                  description={category.description}
                  featuredCategory={category._type}
                />
              );
            })}
          </View>
        )}

      </ScrollView>

</SafeAreaView>
    )
}