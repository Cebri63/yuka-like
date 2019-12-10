import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";

const SignUp = ({ setSignUp, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  sign = async () => {
    try {
      const response = await axios.post(
        "https://yuka-back.herokuapp.com/sign_up",
        {
          username: username,
          email: email,
          password: password
        }
      );

      if (response.data.token) {
        console.log(response.data);
        setToken(response.data.token);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TextInput
        autoCapitalize="none"
        onChangeText={value => setUsername(value)}
        style={{
          backgroundColor: "green",
          width: 300,
          height: 60,
          paddingLeft: 10
        }}
        placeholder="username"
      />
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
      <TouchableOpacity onPress={() => setSignUp(false)}>
        <Text>J'ai déjà un compte</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
