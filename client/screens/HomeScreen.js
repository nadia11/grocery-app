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

export default function HomeScreen() {


  return (
    <>
      
    </>
  );
}
