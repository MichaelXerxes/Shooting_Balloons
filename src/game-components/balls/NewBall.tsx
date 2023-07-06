import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ContextType } from "../../types/types";
import { BallProps } from "../../interfaces/ballInterface";
const boxSize = 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  ball: {
    position: "absolute",
    width: boxSize,
    height: boxSize,
    borderRadius: 25,
    backgroundColor: "#FF0000",
  },
});
const NewBall: React.FC<BallProps> = ({
  durationX,
  durationY,
  colorOne = "red",
  colorTwo = "blue",
  initialStartX = 0,
  initialStartY = 0,
  screenWidth = 200,
}) => {
  const boxX = useSharedValue(initialStartX);
  const boxY = useSharedValue(initialStartY);
  const direction = useSharedValue(1);
  useEffect(() => {
    const intervalId = setInterval(() => {
      boxX.value = withTiming(boxX.value + 1 * direction.value, {
        duration: durationX,
      });
      if (boxX.value > screenWidth - boxSize) {
        direction.value = -1;
      }
      if (boxX.value < 0) {
        direction.value = 1;
      }
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [boxX]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: boxX.value,
        },
        {
          translateY: boxY.value,
        },
      ],
      backgroundColor: boxX.value < screenWidth / 2 ? colorOne : colorTwo,
    };
  });
  return (
    <View>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </View>
  );
};

export default NewBall;
