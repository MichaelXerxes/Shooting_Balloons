import React, { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { PlayerProps } from "../../interfaces/characters";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ContextType } from "../../types/types";
import { PanGestureHandler } from "react-native-gesture-handler";
const PlayerMoving: React.FC<PlayerProps> = ({
  position,
  width,
  height,
  onUpdatePlayerPosition,
}) => {
  const [x = 50, y = 50] = position;
  const boxSize = 50;
  const boxX = useSharedValue(x);
  const boxY = useSharedValue(y);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: ContextType) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
    },
    onActive: (event, ctx) => {
      boxX.value = event.translationX + ctx.offsetX;
      boxY.value = event.translationY + ctx.offsetY;
    },
    onEnd: () => {
      if (boxX.value < 0 || boxX.value > width - boxSize) {
        boxX.value = withSpring(0);
      }
      if (boxY.value < 0 || boxY.value > height - boxSize) {
        boxY.value = withSpring(0);
      }
      onUpdatePlayerPosition(boxX.value, boxY.value);
    },
  });

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
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.player, animatedStyle]}>
        <ImageBackground
          source={require("../../assets/characters/animeCh1.png")}
          style={styles.box}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  box: {
    width: 50,
    height: 50,
  },
});

export default PlayerMoving;
