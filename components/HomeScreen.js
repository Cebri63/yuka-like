import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ScanScreen from "./ScanScreen";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

const HomeScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [data, setData] = useState({});

  moment.locale("fr");
  let m = moment(new Date(), "YYYY-MM-DD");

  renderNutriColor = () => {
    if (data.nutriscore_score >= 75) {
      return "green";
    } else if (data.nutriscore_score < 25) {
      return "red";
    } else if (data.nutriscore_score >= 25 && data.nutriscore_score < 50) {
      return "orange";
    } else if (data.nutriscore_score >= 50 && data.nutriscore_score < 75) {
      return "yellow";
    }
  };

  let color = renderNutriColor();

  // next step

  // get history of scanned products by requesting the server
  // return this history

  getData = async () => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barCode}.json`
      );

      setData(response.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };

  saveData = async () => {
    try {
      const response = await axios.post(
        "https://yuka-back.herokuapp.com/create",
        {
          product_id: data._id,
          name: data.product_name,
          brand: data.stores_tags.length > 0 && data.stores_tags[0],
          nutriScore: data.nutriscore_score,
          date: m,
          image: data.image_front_url
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    barCode && getData();
  }, [barCode]);

  useEffect(() => {
    Object.keys(data).length > 0 && saveData();
  }, [data]);

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
        <>
          <Text>{data.product_name}</Text>
          <Text>{data.stores_tags[0]}</Text>
          <Text>{data.nutriscore_score}</Text>
          <MaterialCommunityIcons name="checkbox-blank-circle" color={color} />
          <Text>{m.fromNow()}</Text>
          <Image
            style={{ width: 150, height: 200 }}
            source={{
              uri: data.image_front_url
            }}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreen;
