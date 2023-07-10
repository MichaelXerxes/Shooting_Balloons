import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { SingleAmmo } from "../../interfaces/ammunition";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ContextType } from "../../types/types";
import { PanGestureHandler } from "react-native-gesture-handler";
const Ammo: React.FC<SingleAmmo> = ({
  position,
  width = 10,
  height = 20,
  colorOne = "red",
  colorTwo = "#CE512A",
  directionX = 1,
  directionY = 1,
  heightScreen = 600,
}) => {
  const [x, y] = position;

  const ammoY = useSharedValue(y);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: ammoY.value,
    };
  });

  useEffect(() => {
    const ammoSpeed = 5;

    const destroyHeight = heightScreen * 2;

    const interval = setInterval(() => {
      ammoY.value -= ammoSpeed * directionY;

      if (ammoY.value <= -destroyHeight || ammoY.value >= destroyHeight) {
        clearInterval(interval);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <View style={[styles.ammo, { left: x }, animatedStyle]} />;
};

const styles = StyleSheet.create({
  ammo: {
    position: "absolute",
    width: 10,
    height: 20,
    backgroundColor: "red",
  },
});

export default Ammo;
