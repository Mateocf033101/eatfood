import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors, Images } from "../contants";
import { Display } from "../utils";
import { Separator } from "../components";

const VerificationScreen = ({
  route: {
    params: { phoneNumber },
  },
  navigation,
}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "" });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={styles.arrowIcon} source={Images.ARROW} />
        </Pressable>
        <Text style={styles.headerTitle}>Verificación OTP</Text>
      </View>
      <Text style={styles.title}>Verificación OTP</Text>
      <Text style={styles.content}>
        Ingresa el código enviado al telefono al:{" "}
        <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChange={(text) => {
              setOtp({ ...otp, 1: text });
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChange={(text) => {
              setOtp({ ...otp, 2: text });
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChange={(text) => {
              setOtp({ ...otp, 3: text });
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChange={(text) => {
              setOtp({ ...otp, 4: text });
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => console.log(otp)}
      >
        <Text style={styles.signinButtonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  phoneNumberText: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFAULT_YELLOW,
    borderWidth: 0.5,
    height: Display.setHeight(6),
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
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

export default VerificationScreen;
