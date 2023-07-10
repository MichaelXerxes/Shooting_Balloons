import React from "react";
import { View, StyleSheet } from "react-native";

const BallS = ({ position, radius, color }) => {
  const ballStyle = {
    position: "absolute",
    left: position[0] - radius,
    top: position[1] - radius,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    backgroundColor: color,
  };

  return <View style={ballStyle} />;
};

export default BallS;
