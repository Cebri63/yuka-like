import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Constants from "expo-constants";

import HomeScreen from "./components/HomeScreen";
import FavScreen from "./components/FavScreen";
import Product from "./components/Product";

import Carotte from "./assets/images/Carotte";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/routers";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
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
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="home" options={{ header: () => null }}>
                      {() => <HomeScreen />}
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
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
