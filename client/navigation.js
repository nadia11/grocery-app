import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ResturantScreen from './screens/ResturantScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import IntroScreen from './screens/IntroScreen';
import LogInScreen from './screens/LogInScreen';



export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator initialRouteName='Intro'>
           <Stack.Screen name="Intro" options={{ presentation: 'fullScreenModal', headerShown: false }} component={IntroScreen} />
            <Stack.Screen name="Login" options={{ presentation: 'fullScreenModal', headerShown: false }} component={LogInScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Resturant" component={ResturantScreen} />
            <Stack.Screen name="Cart" options={{ presentation: 'modal', headerShown: false }} component={CartScreen} />
            <Stack.Screen name="PreparingOrder" options={{ presentation: 'fullScreenModal', headerShown: false }} component={PreparingOrderScreen} />
            <Stack.Screen name="Delivery" options={{ presentation: 'fullScreenModal', headerShown: false }} component={DeliveryScreen} />
        </Stack.Navigator>
  );
}
