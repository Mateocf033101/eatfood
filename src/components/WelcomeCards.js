import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Display } from "../utils";
import { Images } from "../contants";

const WelcomeCard = ({ title, content, image }) => {
  return (
    <View style={StyleSheet.container}>
      <Image style={styles.image} source={Images[image]} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Display.setWidth(100),
  },
  image: {
    height: Display.setHeight(30),
    width: Display.setWidth(60),
  },
  titleText: {
    fontSize: 22,
  },
  contentText: {
    fontSize: 15,
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default WelcomeCard;
