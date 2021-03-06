import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const qrSize = width * 0.7;

const ScanScreen = ({ setIsVisible, setBarCode, setScanned, scanned }) => {
  const [cameraPermission, setCameraPermission] = useState(null);

  handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsVisible(false);
    setBarCode(data);
  };

  useEffect(() => {
    const getPermissionsAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setCameraPermission(status === "granted");
    };
    getPermissionsAsync();
  }, []);

  if (cameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (cameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
        >
          <MaterialCommunityIcons
            name="barcode-scan"
            size={200}
            color="white"
          />
        </BarCodeScanner>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "yellow",
    position: "relative"
  },
  img: {
    marginTop: "20%",
    marginBottom: "20%",
    width: qrSize,
    height: qrSize
  }
});

export default ScanScreen;
