import React, { useEffect } from "react";
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
import {
  characterOne,
  characterTwo,
  characterThree,
  characterFour,
  characterFive,
  characterSix,
} from "../../consts/IMAGES";
const PlayerMoving: React.FC<PlayerProps> = ({
  position,
  width,
  height,
  onUpdatePlayerPosition,
  playerImageNameIndex: playerImageName = 4,
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
      //   if (onUpdatePlayerPosition) {
      //     onUpdatePlayerPosition(boxX.value, boxY.value);
      //   }
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
  useEffect(() => {
    //   onUpdatePlayerPosition(boxX.value, boxY.value);
    // console.log("Player Moving X :", boxX.value);
    // console.log("Player Moving Y :", boxY.value);
    if (onUpdatePlayerPosition) {
      onUpdatePlayerPosition(boxX.value, boxY.value);
    }
  }, [boxX.value, boxY.value]);

  const imageArray = [
    characterOne,
    characterTwo,
    characterThree,
    characterFour,
    characterFive,
    characterSix,
  ];
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={[styles.player, animatedStyle]}>
        <ImageBackground
          // source={playerImageMap[playerImageName]}
          source={imageArray[playerImageName]}
          style={styles.box}
          resizeMode="contain"
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
