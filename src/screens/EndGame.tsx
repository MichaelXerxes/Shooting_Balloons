import React from "react";
import { StyleSheet, ImageBackground, Animated, Text } from "react-native";
import {
  GameScreenNavigationProp,
  GameScreenRouteProp,
} from "../types/navigation.types";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "../types/navigation.types";

type GameScreenProps = StackScreenProps<RootStackParamList, "EndGame">;

const EndGame: React.FC<GameScreenProps> = ({ navigation, route }) => {
  // const { playerImageName } = route.params;

  return (
    <ImageBackground
      source={require("../assets/end-game/back10.png")}
      style={styles.container}
    >
      <Text style={styles.title}>GAME OVER!</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
});
export default EndGame;
