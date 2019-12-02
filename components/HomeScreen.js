import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ScanScreen from "./ScanScreen";
import axios from "axios";

const HomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [data, setData] = useState({});

  getData = async () => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`
      );
      console.log(response.data.product.image_front_url);
      setData(response.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [barCode]);

  return (
    <View>
      <Text>HomeScreen</Text>
      <Modal
        onRequestClose={() => {
          setIsVisible(false);
        }}
        visible={isVisible}
      >
        <ScanScreen setBarCode={setBarCode} setIsVisible={setIsVisible} />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Text>Go to scan</Text>
      </TouchableOpacity>
      {data.image_front_url && (
        <Image
          style={{ width: 150, height: 200 }}
          source={{
            uri: data.image_front_url
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;
