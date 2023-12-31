import React from "react";
import { View, StyleSheet } from "react-native";
import { PlayerProps } from "../../interfaces/characters";
const Player: React.FC<PlayerProps> = ({ position }) => {
  const [x, y] = position;

  return <View style={[styles.player, { left: x, top: y }]} />;
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "red",
  },
});

export default Player;
