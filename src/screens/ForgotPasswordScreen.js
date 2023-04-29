import React from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Separator, ToggleButton } from "../components";
import { Colors, Images } from "../contants";
import { Display } from "../utils";
import { Pressable } from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View style={style.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={style.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={style.arrowIcon} source={Images.ARROW} />
        </Pressable>
        <Text style={style.headerTitle}>¿Olvidaste tu contraseña?</Text>
      </View>
      <Text style={style.title}>Contraseña Olvidada</Text>
      <Text style={style.content}>
        Ingresa tu correo y podremos ayudarte a restablecer tu contraseña
      </Text>
      <View style={style.inputContainer}>
        <View style={style.inputSubContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={style.inputText}
          />
        </View>
      </View>
      <TouchableOpacity
        style={style.signinButton}
        onPress={() => navigation.navigate("RegisterPhone")}
      >
        <Text style={style.signinButtonText}>Restablecer contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 25,
    lineHeight: 25 * 1.4,
    fontWeight: "bold",
    marginTop: 30,
    width: Display.setWidth(80),
    textAlign: "center",
  },
  title: {
    fontSize: 23,
    lineHeight: 23 * 1.4,
    marginTop: 50,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
  },
  inputSubContainer: {
    flexDirection: "row",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
});

export default ForgotPasswordScreen;
