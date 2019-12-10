import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FavScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Le produit</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
export default FavScreen;
