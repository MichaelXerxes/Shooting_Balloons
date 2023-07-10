import React from "react";
import { View, StyleSheet } from "react-native";
import { EnemyProps } from "../../interfaces/characters";
const Enemy: React.FC<EnemyProps> = ({ position }) => {
  const [x, y] = position;

  return <View style={[styles.player, { left: x, top: y }]} />;
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "green",
  },
});

export default Enemy;
