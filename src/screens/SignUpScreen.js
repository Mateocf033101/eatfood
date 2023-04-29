import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors, Images } from "../contants";
import { Display } from "../utils";
import { Separator } from "../components";
import { Pressable } from "react-native";
import { AuthenticationService } from "../services";
import LottieView from "lottie-react-native";

const inputStyle = (state) => {
  switch (state) {
    case "valido":
      return {
        ...style.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_YELLOW,
      };
    case "invalido":
      return {
        ...style.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return style.inputContainer;
      break;
  }
};

const SignUpScreen = ({ navigation }) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailState, setEmailState] = useState("default");
  const [userState, setUserState] = useState("default");

  const register = () => {
    let user = {
      username,
      email,
      password,
    };
    console.log(user);
    setIsloading(true);
    AuthenticationService.register(user).then((response) => {
      setIsloading(false);
      console.log(response);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then((response) => {
        if (response?.status) {
          type === "email" && emailErrorMessage
            ? setEmailErrorMessage("")
            : null;
          type === "username" && usernameErrorMessage
            ? setUsernameErrorMessage("")
            : null;
          type === "email" ? setEmailState("valido") : null;
          type === "username" ? setUserState("valido") : null;
        } else {
          type === "email" ? setEmailErrorMessage(response?.message) : null;
          type === "username"
            ? setUsernameErrorMessage(response?.message)
            : null;
          type === "email" ? setEmailState("invalido") : null;
          type === "username" ? setUserState("invalido") : null;
        }
      });
    }
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
        <Pressable onPress={() => navigation.goBack()}>
          <Image style={style.arrowIcon} source={Images.ARROW} />
        </Pressable>
        <Text style={style.headerTitle}>Registro</Text>
      </View>
      <Text style={style.title}>Crea tu cuenta</Text>
      <Text style={style.content}>
        Ingresa tu corre, elige tu usuario y contraseña
      </Text>
      <View style={inputStyle(userState)}>
        <View style={style.inputSubContainer}>
          <TextInput
            placeholder="Usuario"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={style.inputText}
            onChangeText={(text) => setUsername(text)}
            onEndEditing={({ nativeEvent: { text } }) =>
              checkUserExist("username", text)
            }
          />
        </View>
      </View>
      <Text style={style.errorMess}>{usernameErrorMessage}</Text>
      <View style={inputStyle(emailState)}>
        <View style={style.inputSubContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={style.inputText}
            onChangeText={(text) => setEmail(text)}
            onEndEditing={({ nativeEvent: { text } }) =>
              checkUserExist("email", text)
            }
          />
        </View>
      </View>
      <Text style={style.errorMess}>{emailErrorMessage}</Text>
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
      <TouchableOpacity style={style.signinButton} onPress={() => register()}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={style.signinButtonText}>Crear cuenta</Text>
        )}
      </TouchableOpacity>
      <Separator height={15} />
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
  errorMess: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    marginHorizontal: 20,
    marginTop: 10,
    color: Colors.DEFAULT_RED,
  },
});

export default SignUpScreen;
