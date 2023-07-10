import React, { Component, useRef, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  // Animated,
} from "react-native";
import { HomeScreenNavigationProp } from "../types/navigation.types";
import { useColorContext } from "../mobx/ColorsStore";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
const { height } = Dimensions.get("window");

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface State {}

const Home: React.FC<Props> = ({ navigation }) => {
  const styles = StyleSheet.create({
    Maincontainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      perspective: 1000,

      transform: [{ rotateX: "45deg" }],
      paddingHorizontal: 10,
    },
    testPlayGame: {
      color: "white",
      fontSize: 25,
      fontWeight: "bold",
    },
    buttonPlay: {
      width: 300,
      height: 55,
      justifyContent: "center",
      alignContent: "center",
      borderColor: "white",
      borderWidth: 2.5,
      borderRadius: 10,
      alignItems: "center",
    },
  });

  const playGame = () => {
    navigation.navigate("SelectCharacter");
  };
  return (
    <ImageBackground
      source={require("../assets/end-game/edngame1.png")}
      style={styles.Maincontainer}
    >
      <TouchableOpacity style={styles.buttonPlay} onPress={() => playGame()}>
        <Text style={styles.testPlayGame}>PLAY GAME</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Home;
