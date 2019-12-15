import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import axios from "axios";

import LogoYuka from "../assets/images/LogoYuka";

const SignUp = ({ setSignUp, setToken, setId, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  sign = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://yuka-back.herokuapp.com/sign_up",
        {
          username: username,
          email: email,
          password: password
        }
      );

      if (response.data.token) {
        setToken(response.data.token);
        setId(response.data._id);
        setUser(response.data.username);
        setIsLoading(false);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
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
          onChangeText={value => setUsername(value)}
          style={{
            borderBottomColor: "#5DCC71",
            borderBottomWidth: 1,
            color: "#4A4A4A",
            width: 300,
            height: 60,
            paddingLeft: 10
          }}
          placeholder="username"
          placeholderTextColor="#5DCC71"
        />
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
          onPress={sign}
          disabled={isLoading ? true : false}
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
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white" }}> Se connecter</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSignUp(false)}>
          <Text style={{ color: "#4A4A4A", textDecorationLine: "underline" }}>
            Je n'ai pas de compte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
