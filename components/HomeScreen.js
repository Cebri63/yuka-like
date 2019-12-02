import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1
  }
});

export default HomeScreen;
