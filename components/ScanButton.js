import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScanButton = ({ setIsVisible, setScanned }) => {
  return (
    <View style={{ position: "absolute", right: 30, bottom: 30 }}>
      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: "#5DCC71",
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          setIsVisible(true);
          setScanned(false);
        }}
      >
        <MaterialCommunityIcons name="barcode-scan" color="white" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default ScanButton;
