
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import ResturantScreen from './screens/ResturantScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import IntroScreen from './screens/IntroScreen';
import LogInScreen from './screens/LogInScreen';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import DarkTheme from '@react-navigation/native';
export default function BottomNavigator() {
const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen name="Tab2" component={CategoriesScreen}   options={{
          tabBarLabel: "Home",
        }}/>
       <Tab.Screen name="Tab3" component={SearchScreen}   options={{
          tabBarLabel: "Search",
        }}/>
    </Tab.Navigator>
  );

}
