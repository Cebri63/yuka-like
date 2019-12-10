import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import SignUp from "../components/SignUp";
const LoginScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);

  log = async () => {
    try {
      const response = await axios.post(
        "https://yuka-back.herokuapp.com/log_in",
        {
          email: email,
          password: password
        }
      );
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        alert("Mauvais email et/ou mot de passe");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return !signUp ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TextInput
        autoCapitalize="none"
        onChangeText={value => setEmail(value)}
        style={{
          backgroundColor: "green",
          width: 300,
          height: 60,
          paddingLeft: 10
        }}
        placeholder="email"
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
        style={{
          backgroundColor: "green",
          width: 300,
          height: 60,
          paddingLeft: 10
        }}
        placeholder="password"
      />
      <TouchableOpacity
        onPress={log}
        style={{ backgroundColor: "lightgrey", height: 40, width: 200 }}
      >
        <Text> Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSignUp(true)}>
        <Text>Je n'ai pas de compte</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <SignUp setToken={setToken} setSignUp={setSignUp} />
  );
};

export default LoginScreen;
