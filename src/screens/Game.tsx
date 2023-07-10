import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ImageBackground, Animated } from "react-native";
import { GameScreenNavigationProp } from "../types/navigation.types";
import { useIsFocused } from "@react-navigation/native";

interface Props {
  navigation: GameScreenNavigationProp;
}

const Game: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/ai-images/marksq.png")}
      style={styles.container}
    ></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 10,
  },
  category1: {
    alignSelf: "flex-start",
  },
  category2: {
    alignSelf: "flex-end",
  },
  category3: {
    alignSelf: "center",
  },
});
export default Game;
