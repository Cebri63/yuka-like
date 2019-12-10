import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";

const BackButton = ({ setScanned, setFromHistory, fromHistory }) => {
  const navigation = useNavigation();
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
          fromHistory ? setFromHistory(false) : setScanned(false);
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
