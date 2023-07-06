import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
  useDerivedValue,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const Ball2: React.FC = () => {
  const ballSize = 50;
  const translateY = useSharedValue(0);

  const bounce = () => {
    translateY.value = withTiming(
      height - ballSize,
      {
        duration: 3000,
        easing: Easing.linear,
      },
      () => {
        translateY.value = withTiming(
          0,
          {
            duration: 3000,
            easing: Easing.linear,
          },
          () => {
            runOnJS(bounce)();
          }
        );
      }
    );
  };

  useEffect(() => {
    bounce();
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={[styles.ball, animatedStyles]} />;
};

const styles = StyleSheet.create({
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    position: "absolute",
    left: width / 2 - 25,
  },
});

export default Ball2;
