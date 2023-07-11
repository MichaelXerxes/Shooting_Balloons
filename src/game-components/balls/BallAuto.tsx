import React, { useEffect } from "react";
import { Dimensions, StyleSheet, ImageBackground } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  useDerivedValue,
  runOnJS,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { withBouncing } from "react-native-redash";
import { BallProps } from "../../interfaces/ballInterface";
const { height, width } = Dimensions.get("window");

const BallAuto: React.FC<BallProps> = ({
  durationX,
  durationY,
  ballSize = 50,
  colorOne = "pink",
  colorTwo = "blue",
  //   initialStartX = 0,
  //   initialStartY = 0,
  screenWidth = 200,
  screenHeight = 400,
  directionValueX = 1,
  directionValueY = 1,
  position,
  radius = 25,
}) => {
  const styles = StyleSheet.create({
    ball: {
      position: "absolute",
      left: position[0] - radius,
      top: position[1] - radius,
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      backgroundColor: colorOne,
    },
    box: {
      width: 50,
      height: 50,
    },
  });
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
      backgroundColor: "transparent",
      //backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[styles.ball, animatedStyle]}>
      <ImageBackground
        source={require("../../assets/monsters/mon2.png")}
        style={styles.box}
      />
    </Animated.View>
  );
};

export default BallAuto;
