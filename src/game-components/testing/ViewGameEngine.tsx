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
import NewBall from "../balls/NewBall";
const boxSize = 50;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  box: {
    position: "absolute",
    width: boxSize,
    height: boxSize,
    backgroundColor: "#FF0000",
  },
  autoBox: {
    position: "absolute",
    width: boxSize,
    height: boxSize,
    backgroundColor: "#00FF00",
  },
  box2: {
    position: "absolute",
    width: boxSize,
    height: boxSize,
    backgroundColor: "yellow",
  },
});

const ViewGameEngine = () => {
  const boxX = useSharedValue(0);
  const boxY = useSharedValue(0);

  const box1X = useSharedValue(5);
  const box1Y = useSharedValue(10);

  const autoBoxX = useSharedValue(0);
  const autoBoxY = useSharedValue(height / 2 - boxSize / 2);
  const direction = useSharedValue(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      autoBoxX.value = withTiming(autoBoxX.value + 1 * direction.value, {
        duration: 10,
      });
      if (autoBoxX.value > width - boxSize) {
        direction.value = -1;
      }
      if (autoBoxX.value < 0) {
        direction.value = 1;
      }
    }, 20);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoBoxX]);

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
    },
  });

  const handleGesture2 = useAnimatedGestureHandler({
    onStart: (_, ctx: ContextType) => {
      ctx.offsetX = box1X.value;
      ctx.offsetY = box1Y.value;
    },
    onActive: (event, ctx) => {
      box1X.value = event.translationX + ctx.offsetX;
      box1Y.value = event.translationY + ctx.offsetY;
    },
    onEnd: () => {
      if (box1X.value < 0 || box1X.value > width - boxSize) {
        box1X.value = withSpring(0);
      }
      if (box1Y.value < 0 || box1Y.value > height - boxSize) {
        box1Y.value = withSpring(0);
      }
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
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: box1X.value,
        },
        {
          translateY: box1Y.value,
        },
      ],
    };
  });
  const autoBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: autoBoxX.value,
        },
        {
          translateY: autoBoxY.value,
        },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <GameEngine>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={handleGesture2}>
          <Animated.View style={[styles.box2, animatedStyle1]} />
        </PanGestureHandler>
        <Animated.View style={[styles.autoBox, autoBoxStyle]} />
        <NewBall
          durationX={10}
          durationY={2000}
          initialStartX={10}
          initialStartY={20}
          screenWidth={width}
        />
        <NewBall
          durationX={100}
          durationY={2000}
          initialStartX={30}
          initialStartY={150}
          screenWidth={width}
          colorOne="yellow"
          colorTwo="white"
        />
        <NewBall
          durationX={2}
          durationY={2000}
          initialStartX={30}
          initialStartY={250}
          screenWidth={width}
          colorOne="black"
          colorTwo="orange"
        />
      </GameEngine>
    </View>
  );
};

export default ViewGameEngine;
