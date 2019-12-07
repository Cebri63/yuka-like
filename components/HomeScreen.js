import React, { useState, useEffect } from "react";
import { Modal, RefreshControl, ScrollView } from "react-native";

import ScanScreen from "./ScanScreen";
import Product from "./Product";
import History from "./History";
import ScanButton from "./ScanButton";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";

const HomeScreen = ({ history, isLoading, getHistory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [barCode, setBarCode] = useState(null);
  const [data, setData] = useState({});
  const [scanned, setScanned] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  moment.locale("fr");
  let m = moment(new Date());

  onRefresh = () => {
    setRefreshing(true);
    getHistory().then(() => {
      setRefreshing(false);
    });
  };

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
          brand: data.brands,
          nutriScore: data.nutriscore_grade,
          date: m,
          image: data.image_front_url
        }
      );
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

  return !scanned ? (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#5DCC71", "white"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={{ flex: 1 }}
      >
        <History isLoading={isLoading} data={history} />
        <Modal
          onRequestClose={() => {
            setIsVisible(false);
          }}
          visible={isVisible}
        >
          <ScanScreen
            setScanned={setScanned}
            scanned={scanned}
            setBarCode={setBarCode}
            setIsVisible={setIsVisible}
          />
        </Modal>
      </ScrollView>
      <ScanButton setScanned={setScanned} setIsVisible={setIsVisible} />
    </>
  ) : (
    <Product
      data={data}
      setScanned={setScanned}
      scanned={scanned}
      setBarCode={setBarCode}
      setIsVisible={setIsVisible}
      isVisible={isVisible}
    />
  );
};

export default HomeScreen;
