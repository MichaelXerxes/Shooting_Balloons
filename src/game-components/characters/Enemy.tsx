import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { EnemyProps } from "../../interfaces/characters";
const Enemy: React.FC<EnemyProps> = ({ position }) => {
  const [x, y] = position;
  const [enemyPosition, setEnemyPosition] = useState({ left: x, top: y });

  useEffect(() => {
    setEnemyPosition((prevPosition) => ({ ...prevPosition, left: x, top: y }));
  }, [x, y]);

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
