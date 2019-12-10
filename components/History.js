import React from "react";
import { View, Text, FlatList, Image } from "react-native";

import Quality from "./Quality";
import { Facebook } from "react-content-loader/native";

import moment from "moment";
import "moment/locale/fr";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
moment.locale("fr");

const History = ({ data, isLoading, setFromHistory, setItem }) => {
  goProduct = async item => {
    setFromHistory(true);
    setItem(item);
  };

  return isLoading ? (
    <View
      style={{
        padding: 20
      }}
    >
      <Facebook />
      <Facebook />
      <Facebook />
      <Facebook />
      <Facebook />
      <Facebook />
    </View>
  ) : (
    <FlatList
      keyExtractor={item => item._id}
      data={data}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          onPress={() => {
            goProduct(item);
          }}
          style={{
            height: 150,
            backgroundColor: "white",
            marginVertical: 3,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 100, width: 100, borderRadius: 5 }}
            source={{
              uri: item.image
            }}
          />
          <View style={{ paddingHorizontal: 5 }}>
            <Text>{item.name}</Text>
            <Text>
              {item.brand.charAt(0).toUpperCase() + item.brand.slice(1)}
            </Text>
            {item.nutriScore ? <Quality nutriScore={item.nutriScore} /> : null}
            <Text>{moment(item.date).fromNow()}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    />
  );
};

export default History;
