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
import PaymentScreen from './screens/PaymentScreen'
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import DarkTheme from '@react-navigation/native';
import * as Icon from "react-native-feather";
export default function BottomNavigator() {
const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen name="Tab2" component={CategoriesScreen}   options={{
          tabBarLabel: "Categories",
           tabBarIcon: ({ color, size }) => (
            <Icon.Home height="25" width="25" stroke="gray" />
          ),
            tabBarActiveTintColor:'green'
        }}/>
       <Tab.Screen name="Search" component={SearchScreen}   options={{
          tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
            <Icon.Search height="25" width="25" stroke="gray" />
          ),
          tabBarActiveTintColor:'green'
        }}/>
          <Tab.Screen name="Payment" component={PaymentScreen}   options={{
          tabBarLabel: "Payment",
            tabBarIcon: ({ color, size }) => (
            <Icon.CreditCard height="25" width="25" stroke="gray" />
          ),
            tabBarActiveTintColor:'green'
        }}/>
    </Tab.Navigator>
  );

}
