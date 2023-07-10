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
const size = 50;
const NewBall: React.FC<BallProps> = ({
  durationX,
  durationY,
  ballSize = size,
  colorOne = "red",
  colorTwo = "blue",
  //   initialStartX = 0,
  //   initialStartY = 0,
  screenWidth = 200,
  screenHeight = 400,
  directionValueX = 1,
  directionValueY = 1,
  position,
}) => {
  const [x = 0, y = 0] = position;
  const boxX = useSharedValue(x);
  const boxY = useSharedValue(y);
  const directionX = useSharedValue(directionValueX);
  const directionY = useSharedValue(directionValueY);
  const backgroundColor = useSharedValue(colorOne);
  useEffect(() => {
    const intervalId = setInterval(() => {
      boxX.value = withTiming(boxX.value + 1 * directionX.value, {
        duration: durationX,
      });
      boxY.value = withTiming(boxY.value + 1 * directionY.value, {
        duration: durationY,
      });
      backgroundColor.value =
        boxX.value < screenWidth / 2 ? colorOne : colorTwo;
      if (boxX.value > screenWidth - ballSize) {
        directionX.value = -1;
      }
      if (boxX.value < 0) {
        directionX.value = 1;
      }
      if (boxY.value > screenHeight - ballSize) {
        directionY.value = -1;
      }
      if (boxY.value < 0) {
        directionY.value = 1;
      }
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [boxX, boxY]);

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
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <View>
      <Animated.View style={[styles.ball, animatedStyle]} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: 25,
  },
});
export default NewBall;
