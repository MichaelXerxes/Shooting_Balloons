import React, { useState, useEffect } from "react";
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
const PlayerBottomScreen: React.FC<PlayerProps> = ({
  position,
  width,
  height,
  onUpdatePlayerPosition,
}) => {
  const [x = 50, y = height - 50] = position;
  const boxSize = 50;
  const boxX = useSharedValue(x);
  const boxY = useSharedValue(y);
  const [ammoPosition, setAmmoPosition] = useState<[number, number]>([
    x + boxSize / 2,
    y,
  ]);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx: ContextType) => {
      ctx.offsetX = boxX.value;
      ctx.offsetY = boxY.value;
    },
    onActive: (event, ctx) => {
      boxX.value = event.translationX + ctx.offsetX;
    },
    onEnd: () => {
      if (boxX.value < 0 || boxX.value > width - boxSize - 50) {
        boxX.value = withSpring(0);
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
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.player, animatedStyle]}>
        <ImageBackground
          source={require("../../assets/characters/spaceSh1.png")}
          style={styles.box}
        />
        {/* {ammoPosition && (
          <Animated.View
            style={[
              styles.ammo,
              { left: ammoPosition[0], top: ammoPosition[1] },
            ]}
          />
        )} */}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    bottom: 30,
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  box: {
    width: 50,
    height: 50,
  },
  ammo: {
    position: "absolute",
    width: 5,
    height: 20,
    backgroundColor: "red",
  },
});

export default PlayerBottomScreen;
