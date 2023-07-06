import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BallProps } from "../../interfaces/ballInterface";
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Ball: React.FC<BallProps> = ({
  durationX,
  durationY,
  colorOne = "red",
  colorTwo = "blue",
  initialStartX = 0,
  initialStartY = 0,
}) => {
  const ballSize = 30;

  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;
  const insets = useSafeAreaInsets();

  const maxX = window.width - ballSize;
  const maxY = window.height - ballSize - statusBarHeight;

  const x = useSharedValue(initialStartX === 0 ? maxX : maxX - initialStartX);
  const y = useSharedValue(initialStartY);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(0, { duration: durationX, easing: Easing.linear }),
      -1,
      true
    );
    y.value = withRepeat(
      withTiming(maxY, { duration: durationY, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const ballStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { skewX: "40deg" },
        { scale: x.value < window.width / 2 ? 2 : 1 },
      ],
      backgroundColor: x.value < windsow.width / 2 ? colorOne : colorTwo,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, ballStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
  },
});

export default Ball;
