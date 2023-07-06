import React, { useEffect } from "react";
import { Dimensions } from "react-native";
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

const { height, width } = Dimensions.get("window");

const Ball4: React.FC = () => {
  const ballSize = 50;
  const translateY = useSharedValue(0);
  const bounces = useSharedValue(0);

  const bounce = () => {
    if (bounces.value < 6) {
      bounces.value += 1;
      translateY.value = withTiming(
        height - ballSize - bounces.value * (ballSize / 3),
        {
          duration: 6000,
          easing: Easing.bounce,
        }
      );
    }
  };

  useEffect(() => {
    bounce();
  }, []);

  useDerivedValue(() => {
    if (translateY.value >= height - ballSize - 1 && bounces.value < 6) {
      runOnJS(bounce)();
    }
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return <Animated.View style={[styles.ball, animatedStyles]} />;
};

const styles = {
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    position: "absolute" as "absolute",
    left: width / 2 - 25,
  },
};

export default Ball4;
