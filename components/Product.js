import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Modal
} from "react-native";

import ScanButton from "./ScanButton";
import ScanScreen from "./ScanScreen";
import Quality from "./Quality";
import BackButton from "./BackButton";

const ProductScreen = ({
  setIsVisible,
  setScanned,
  scanned,
  isVisible,
  setBarCode,
  data,
  color
}) => {
  return (
    <View style={styles.container}>
      <Text>ProductScreen</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});

export default ProductScreen;
