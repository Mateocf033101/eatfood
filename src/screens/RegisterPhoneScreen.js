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
import { FlagItem, Separator } from "../components";
import { Colors, Images, CountryCode } from "../contants";
import { Display } from "../utils";
import { Pressable } from "react-native";
import { StaticImageService } from "../services";
import { FlatList } from "react-native-gesture-handler";

const getDropdownStyle = (y) => ({ ...style.countryDropdown, top: y + 60 });

const RegisterPhoneScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "Colombia")
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdowOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");

  const closeDropdown = (pageX, pageY) => {
    if (isDropdowOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX < dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY < dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };
  return (
    <View
      style={style.container}
      onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
        closeDropdown(pageX, pageY)
      }
    >
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
        <Text style={style.headerTitle}>Registra tu telefono</Text>
      </View>
      <Text style={style.title}>Registra tu telefono</Text>
      <Text style={style.content}>
        Ingresa el telefono que registraste para iniciar sesión
      </Text>
      <View
        style={style.inputsContainer}
        onLayout={({
          nativeEvent: {
            layout: { y },
          },
        }) => setInputsContainerY(y)}
      >
        <TouchableOpacity
          style={style.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdowOpen)}
        >
          <Image
            source={{
              uri: StaticImageService.getFlagIcon(selectedCountry.code),
            }}
            style={style.flatIcon}
          />
          <Text style={style.countryCodeText}>{selectedCountry.dial_code}</Text>
        </TouchableOpacity>
        <View style={style.phoneInputContainer}>
          <TextInput
            placeholder="Numero de telefono"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={style.inputText}
            onChangeText={(text) =>
              setPhoneNumber(selectedCountry?.dial_code + text)
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={style.signinButton}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Verification", { phoneNumber });
        }}
      >
        <Text style={style.signinButtonText}>Continuar</Text>
      </TouchableOpacity>
      {isDropdowOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: { x, y, height, width },
            },
          }) => setDropdownLayout({ x, y, height, width })}
        >
          <FlatList
            data={CountryCode}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <FlagItem
                {...item}
                onPress={(country) => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
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
  inputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flexDirection: "row",
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    height: Display.setHeight(6),
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    paddingLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  flatIcon: {
    height: 20,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
  },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: "absolute",
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
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

export default RegisterPhoneScreen;
