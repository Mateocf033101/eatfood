import React, { useState } from "react";
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
import { AuthenticationService } from "../services";
import LottieView from "lottie-react-native";
import { Connect, connect } from "react-redux";
import { GeneralAction } from "../actions";

const SignInScreen = ({ navigation, setToken }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    let user = {
      username,
      password,
    };
    console.log(user);
    setIsLoading(true);
    AuthenticationService.login(user).then((response) => {
      setIsLoading(false);

      if (!response.status) {
        setErrorMessage(response?.message);
      } else {
        navigation.navigate("Home");
        setErrorMessage("");
      }
    });
  };

  return (
    <View style={style.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={style.headerContainer}>
        <Image style={style.arrowIcon} source={Images.ARROW} />
        <Text style={style.headerTitle}>Inicio de sesión</Text>
      </View>
      <Text style={style.title}>Bienvenido</Text>
      <Text style={style.content}>
        Ingresa tu usuario y contraseña y disfruta de nuestras comidas
      </Text>
      <View style={style.inputContainer}>
        <View style={style.inputSubContainer}>
          <TextInput
            placeholder="Usuario"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={style.inputText}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={style.inputContainer}>
        <View style={style.inputSubContainer}>
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Contraseña"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={style.inputText}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={() => setIsPasswordShow(!isPasswordShow)}>
            <Image style={style.iconInput} source={Images.EYE} />
          </Pressable>
        </View>
      </View>
      <Text style={style.errorMess}>{errorMessage}</Text>
      <View style={style.forgotPasswordContainer}>
        <View style={style.toggleContainer}>
          <ToggleButton size={0.8} />
          <Text style={style.rememberText}>Recordar usuario</Text>
        </View>
        <Text
          style={style.forgotPasswordText}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Olvidé mi contraseña
        </Text>
      </View>
      <TouchableOpacity
        style={style.signinButton}
        onPress={() => signIn()}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={style.signinButtonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
      <View style={style.signupContainer}>
        <Text style={style.accountText}>¿No tienes una cuenta?</Text>
        <Text
          style={style.signupText}
          onPress={() => navigation.navigate("SignUp")}
        >
          Registrate
        </Text>
      </View>
      <Text style={style.orText}>O</Text>
      <TouchableOpacity style={style.facebookButton}>
        <View style={style.socialButtonContainer}>
          <View style={style.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={style.signinButtonLogo} />
          </View>
          <Text style={style.socialButtonText}>Conectar con Facebook</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={style.googleButton}>
        <View style={style.socialButtonContainer}>
          <View style={style.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={style.signinButtonLogo} />
          </View>
          <Text style={style.socialButtonText}>Conectar con Google</Text>
        </View>
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
  iconInput: {
    width: 25,
    height: 25,
    marginTop: 15,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREY,
  },
  forgotPasswordText: {
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_YELLOW,
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
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  signupText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_YELLOW,
    marginLeft: 10,
  },
  orText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginLeft: 10,
    alignSelf: "center",
  },
  facebookButton: {
    backgroundColor: Colors.FACEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonLogo: {
    height: 25,
    width: 25,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: "absolute",
    left: 25,
  },
  socialButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  socialButtonText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorMess: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    color: Colors.DEFAULT_RED,
  },
});

export default SignInScreen;
