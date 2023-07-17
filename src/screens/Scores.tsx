import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GameScreenNavigationProp,
  GameScreenRouteProp,
} from "../types/navigation.types";
import { StackScreenProps } from "@react-navigation/stack";

import {
  ScoreScreenNavigationProp,
  ScoresScreenRouteProp,
} from "../types/navigation.types";

// type ScoresScreenProps = StackScreenProps<RootStackParamList, "Scores">;
interface Props {
  navigation: ScoreScreenNavigationProp;
  route: ScoresScreenRouteProp;
}
const Scores: React.FC<Props> = ({ navigation, route }) => {
  // const { playerImageName } = route.params;

  return (
    <ImageBackground
      source={require("../assets/end-game/back10.png")}
      style={styles.container}
    >
      <Text style={styles.title}>SCORES</Text>
      <TouchableOpacity onPress={() => navigation.navigate("EndGame")}>
        <Text style={{ fontSize: 30, color: "white" }}>End Game</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    color: "white",
  },
});
export default Scores;
