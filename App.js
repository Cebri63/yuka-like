import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationNativeContainer } from "@react-navigation/native";
import Constants from "expo-constants";

import HomeScreen from "./components/HomeScreen";
import FavScreen from "./components/FavScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationNativeContainer>
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 12 },
          tabStyle: { width: 100 },
          style: {
            backgroundColor: "red",
            paddingTop: Constants.statusBarHeight
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Fav" component={FavScreen} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
