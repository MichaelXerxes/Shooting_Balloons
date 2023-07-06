import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const Square: React.FC = () => {
  const squareSize = 350;
  const ballSize = 50;
  const maxX = squareSize - ballSize;
  const maxY = squareSize - ballSize;

  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const xDirection = useSharedValue(1);
  const yDirection = useSharedValue(1);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(maxX, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );
    y.value = withRepeat(
      withTiming(maxY, { duration: 3000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value * xDirection.value },
        { translateY: y.value * yDirection.value },
      ],
    };
  });

  return (
    <View style={[styles.square, { width: squareSize, height: squareSize }]}>
      <Animated.View style={[styles.ball, ballStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "blue",
  },
});

export default Square;
