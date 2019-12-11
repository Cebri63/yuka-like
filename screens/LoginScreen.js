import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import SignUp from "../components/SignUp";
import LogoYuka from "../assets/images/LogoYuka";
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
      <LogoYuka />
      <View
        style={{
          marginTop: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TextInput
          autoCapitalize="none"
          onChangeText={value => setEmail(value)}
          style={{
            borderBottomColor: "#5DCC71",
            borderBottomWidth: 1,
            width: 300,
            height: 60,
            paddingLeft: 10,
            color: "#4A4A4A"
          }}
          placeholder="email"
          placeholderTextColor="#5DCC71"
        />
        <TextInput
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          style={{
            borderBottomColor: "#5DCC71",
            borderBottomWidth: 1,
            color: "#4A4A4A",
            width: 300,
            height: 60,
            paddingLeft: 10
          }}
          placeholder="password"
          placeholderTextColor="#5DCC71"
        />
        <TouchableOpacity
          onPress={log}
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
          <Text style={{ color: "white" }}> Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSignUp(true)}>
          <Text style={{ color: "#4A4A4A", textDecorationLine: "underline" }}>
            Je n'ai pas de compte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <SignUp setToken={setToken} setSignUp={setSignUp} />
  );
};

export default LoginScreen;
