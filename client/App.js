import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { store } from "./store";
import { Provider } from "react-redux";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
// import BottomNavigator from "./bottomNavigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "./screens/HomeScreen";
// import ResturantScreen from "./screens/ResturantScreen";
// import CartScreen from "./screens/CartScreen";
// import PreparingOrderScreen from "./screens/PreparingOrderScreen";
// import DeliveryScreen from "./screens/DeliveryScreen";
// import IntroScreen from "./screens/IntroScreen";
// import LogInScreen from "./screens/LogInScreen";
// import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useEffect } from "react";
// import { createRef } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
export default function App() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const Drawer = createDrawerNavigator();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "tomato",
      secondary: "yellow",
    },
  };
  const urlScheme =
    Constants.appOwnership === "expo"
      ? Linking.createURL("/--/")
      : Linking.createURL("");

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StripeProvider
            publishableKey="pk_test_51NvXkCSEjeRODsSaF2Zd5JgxUmIvQtg9ojjkduL7jqDL0PZN49wZPdCHxN8G9RV4f0M7dUApJeH8CsoDOan1bgH700AflBfgpQ"
            urlScheme={urlScheme}
          >
            <SafeAreaProvider>
              <Drawer.Navigator>
                <Drawer.Screen
                  name="Screen1"
                  component={Navigation}
                  options={{ headerShown: false }}
                />
                <Drawer.Screen
                  name="Screen2"
                  component={SettingsScreen}
                  options={{ title: "Settings" }}
                />
              </Drawer.Navigator>
            </SafeAreaProvider>
          </StripeProvider>
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
