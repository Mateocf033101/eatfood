import { View, Text, StyleSheet, StatusBar } from "react-native";
import React, { useState } from "react";
import { CategoryMenuItem, Separator } from "../components";
import { Colors } from "../contants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons/faLocationDot";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faSliders } from "@fortawesome/free-solid-svg-icons/faSliders";
import { Mock } from "../contants";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.DEFAULT_YELLOW}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurverContainer} />
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <FontAwesomeIcon
            icon={faLocationDot}
            size={15}
            color={Colors.DEFAULT_WHITE}
          />
          <Text style={styles.locationText}>Bienvenido a </Text>
          <Text style={styles.selectedLocationText}>HOME</Text>
          <FontAwesomeIcon
            icon={faAngleDown}
            size={16}
            color={Colors.DEFAULT_WHITE}
          />
          <FontAwesomeIcon
            icon={faBell}
            size={24}
            color={Colors.DEFAULT_WHITE}
            style={{ position: "absolute", right: 0 }}
          />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchSection}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size={25}
              color={Colors.DEFAULT_GREY}
            />
            <Text style={styles.searchText}>Buscar</Text>
          </View>
          <FontAwesomeIcon
            icon={faSliders}
            size={20}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
        </View>
        <View style={styles.categoriesContainer}>
          {Mock.CATEGORIES.map(({ name, logo }) => (
            <CategoryMenuItem
              name={name}
              logo={logo}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurverContainer: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    height: 2000,
    position: "absolute",
    top: -1 * (2000 - 230),
    width: 2000,
    alignSelf: "center",
    zIndex: -1,
  },
  headerContainer: {
    justifyContents: "space-evenly",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  locationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  selectedLocationText: {
    color: Colors.DEFAULT_WHITE,
    marginLeft: 5,
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  alertBadge: {
    borderRadius: 32,
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
    alignItems: "center",
    height: 16,
    width: 16,
    position: "absolute",
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    color: Colors.DEFAULT_YELLOW,
    fontSize: 10,
    lineHeight: 10 * 1.4,
  },
  searchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: 45,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  searchText: {
    color: Colors.DEFAULT_GREY,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
});

export default HomeScreen;
