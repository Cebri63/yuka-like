import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BackButton = ({ setScanned }) => {
  return (
    <View style={{ position: "absolute", left: 30, bottom: 40 }}>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
          backgroundColor: "#5DCC71",
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => {
          setScanned(false);
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left-bold"
          color="white"
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
