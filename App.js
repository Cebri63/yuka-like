import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";

import axios from "axios";

import Constants from "expo-constants";

import HomeScreen from "./components/HomeScreen";
import FavScreen from "./components/FavScreen";
import Product from "./components/Product";

import LogoYuka from "./assets/images/LogoYuka";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    const response = await axios.get("https://yuka-back.herokuapp.com/");
    console.log("montage du composant ====>   ", response.data);
    setHistory(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen options={{ header: () => null }} name="splashScreen">
            {() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <LogoYuka />

                <LottieView
                  autoPlay={true}
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: "transparent"
                  }}
                  source={require("./assets/images/7242-barcode-scanner.json")}
                />
              </View>
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  tabStyle: { width: 100 },
                  showIcon: true,
                  showLabel: false,
                  style: {
                    backgroundColor: "#5DCC71",
                    paddingTop: Constants.statusBarHeight
                  }
                }}
              >
                <Tab.Screen
                  options={{
                    title: false,
                    tabBarIcon: () => (
                      <MaterialCommunityIcons
                        name="food-apple"
                        size={26}
                        color="white"
                      />
                      // <Carotte />
                    )
                  }}
                  name="Home"
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="home"
                        options={{ header: () => null }}
                      >
                        {() => (
                          <HomeScreen
                            getHistory={getHistory}
                            isLoading={isLoading}
                            history={history}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen name="product">
                        {() => <Product />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  options={{
                    title: false,
                    tabBarIcon: () => (
                      <MaterialCommunityIcons
                        name="star-box"
                        size={26}
                        color="white"
                      />
                      // <Carotte />
                    )
                  }}
                  name="fav"
                  component={FavScreen}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
