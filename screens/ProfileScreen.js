import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProfileScreen = ({ setToken }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Wesh le profile</Text>

      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
        style={{
          backgroundColor: "#4A4A4A",
          marginVertical: 25,
          height: 40,
          width: 200,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5
        }}
      >
        <Text style={{ color: "white" }}> Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
