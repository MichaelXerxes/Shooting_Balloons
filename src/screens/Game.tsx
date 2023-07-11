import React from "react";
import { StyleSheet, ImageBackground, Animated } from "react-native";
import {
  GameScreenNavigationProp,
  GameScreenRouteProp,
} from "../types/navigation.types";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "../types/navigation.types";
import CustomGameEngine from "../game-Engine/CustomGameEngine";
// interface Props {
//   navigation: GameScreenNavigationProp;
//   route: GameScreenRouteProp;
// }
type GameScreenProps = StackScreenProps<RootStackParamList, "Game">;

const Game: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { playerImageName } = route.params;

  return (
    <ImageBackground
      source={require("../assets/end-game/back10.png")}
      style={styles.container}
    >
      <CustomGameEngine playerImageName={playerImageName} />
    </ImageBackground>
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
