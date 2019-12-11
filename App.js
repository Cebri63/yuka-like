import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LottieView from "lottie-react-native";

import axios from "axios";

import Constants from "expo-constants";

import HomeScreen from "./screens/HomeScreen";
import FavScreen from "./screens/FavScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

import LogoYuka from "./assets/images/LogoYuka";

import { AsyncStorage } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  console.log(AsyncStorage.getItem("userToken"));
  // AsyncStorage.removeItem("userToken");

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const getHistory = async () => {
    const response = await axios.get("https://yuka-back.herokuapp.com/");
    setHistory(response.data);
    setIsLoading(false);
  };

  const bootstrapAsync = async () => {
    // We should also handle error for production apps
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      setIsConnected(false);
    } else {
      setUserToken(userToken);
      getHistory();
    }
  };

  useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {!userToken ? (
          <Stack.Screen name="login" options={{ header: () => null }}>
            {() => <LoginScreen getHistory={getHistory} setToken={setToken} />}
          </Stack.Screen>
        ) : isLoading ? (
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
                  // tabStyle: { width: 100 },
                  headerRight: <Text>Wesh</Text>,
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
                        {() => <ProductScreen />}
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
                    )
                  }}
                  name="fav"
                  component={FavScreen}
                />
                <Tab.Screen
                  options={{
                    title: false,
                    tabBarIcon: () => (
                      <MaterialCommunityIcons
                        name="face-profile"
                        size={26}
                        color="white"
                      />
                    )
                  }}
                  name="profile"
                >
                  {() => <ProfileScreen setToken={setToken} />}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
