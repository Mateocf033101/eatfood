import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { Colors, Images } from "../contants";
import { Display } from "../utils";

const SplashScreen = ({ navigation }) => {
  useEffect(() =>{
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEFAULT_YELLOW}
        translucent
      />
      <Image source={Images.PLATE} resizeMode="contain" style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.DEFAULT_YELLOW,
  },
  image: {
    height: Display.setHeight(80),
    width: Display.setWidth(100),
  },
});

export default SplashScreen;
