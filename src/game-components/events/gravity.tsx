import React, { useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Matter from "matter-js";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const boxSize = Math.trunc(Math.max(width, height) * 0.075);

const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

const boxA = Matter.Bodies.rectangle(0, 0, boxSize, boxSize);
const boxB = Matter.Bodies.rectangle(90, 0, boxSize, boxSize);

Matter.World.add(world, [boxA, boxB]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  box: {
    width: boxSize,
    height: boxSize,
    position: "absolute",
    backgroundColor: "pink",
  },
});

const PhysicsGame = () => {
  useEffect(() => {
    Matter.Engine.run(engine);
  }, []);

  const handleGesture = (event) => {
    const { translationY } = event.nativeEvent;
    Matter.Body.setPosition(boxA, { x: boxSize / 2, y: translationY });
  };

  const handleStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      Matter.Body.setVelocity(boxA, { x: 0, y: 0 });
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleStateChange}
      >
        <View
          style={[styles.box, { top: boxA.position.y, left: boxA.position.x }]}
        />
      </PanGestureHandler>
      <View
        style={[styles.box, { top: boxB.position.y, left: boxB.position.x }]}
      />
    </View>
  );
};

export default PhysicsGame;
