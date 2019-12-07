import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Quality = ({ nutriScore }) => {
  renderQuality = item => {
    if (nutriScore === "a") {
      return "Excellent";
    }
    if (nutriScore === "b") {
      return "Bon";
    }
    if (nutriScore === "c") {
      return "Médiocre";
    }
    if (nutriScore === "d" || nutriScore === "e") {
      return "Mauvais";
    }
  };

  let quality = renderQuality();

  renderNutriColor = () => {
    if (nutriScore === "a") {
      return "green";
    } else if (nutriScore === "d" || nutriScore === "e") {
      return "red";
    } else if (nutriScore === "c") {
      return "orange";
    } else if (nutriScore === "b") {
      return "yellow";
    }
    // if (data.nutriscore_score >= 75) {
    //   return "green";
    // } else if (data.nutriscore_score < 25) {
    //   return "red";
    // } else if (data.nutriscore_score >= 25 && data.nutriscore_score < 50) {
    //   return "orange";
    // } else if (data.nutriscore_score >= 50 && data.nutriscore_score < 75) {
    //   return "yellow";
    // }
  };

  let color = renderNutriColor();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <MaterialCommunityIcons name="checkbox-blank-circle" color={color} />
      <Text style={{ marginLeft: 10 }}>{quality}</Text>
    </View>
  );
};

export default Quality;
