import { View } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import { store } from './store'
import { Provider } from 'react-redux'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import BottomNavigator from './bottomNavigation'
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ResturantScreen from './screens/ResturantScreen';
import CartScreen from './screens/CartScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import IntroScreen from './screens/IntroScreen';
import LogInScreen from './screens/LogInScreen';
import { NavigationContainer } from '@react-navigation/native';
import React, { useLayoutEffect, useState, useEffect } from 'react'

export default function App() {
    const [isInitialized, setIsInitialized] = React.useState(false);
    const Drawer = createDrawerNavigator();

  const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

  return (
    <Provider store={store}>
<PaperProvider theme={theme}>
             <SafeAreaProvider>
                     <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name="Settings" component={HomeScreen}/>
              <Drawer.Screen name="findDoctor" component={LogInScreen} options={{title: 'Find Doctor in Feni'}} />
              <Drawer.Screen name="Navigation"  component={Navigation} options={{headerShown: false}}/>
            </Drawer.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
</PaperProvider>
    </Provider>

  );
};