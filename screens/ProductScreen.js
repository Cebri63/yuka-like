import React from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";

import ScanButton from "../components/ScanButton";
import ScanScreen from "../screens/ScanScreen";
import Quality from "../components/Quality";
import BackButton from "../components/BackButton";

const ProductScreen = ({
  setIsVisible,
  setScanned,
  scanned,
  isVisible,
  setBarCode,
  data,
  fromHistory,
  setFromHistory
}) => {
  return !fromHistory ? (
    <View style={styles.container}>
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
      <ScanButton setScanned={setScanned} setIsVisible={setIsVisible} />
      <BackButton setScanned={setScanned} />

      {data.image_front_url && (
        <>
          <Text>{data.product_name}</Text>
          <Text>{data.stores_tags[0]}</Text>
          {data.nutriscore_grade ? (
            <Quality nutriScore={data.nutriscore_grade} />
          ) : null}
          <Image
            style={{ width: 150, height: 200 }}
            source={{
              uri: data.image_front_url
            }}
          />
        </>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      {data.image && (
        <>
          <Text>{data.name}</Text>
          <Text>{data.brand}</Text>
          {data.nutriScore ? <Quality nutriScore={data.nutriScore} /> : null}
          <Image
            style={{ width: 150, height: 200 }}
            source={{
              uri: data.image
            }}
          />
          <BackButton
            fromHistory={fromHistory}
            setFromHistory={setFromHistory}
            setScanned={setScanned}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

export default ProductScreen;
