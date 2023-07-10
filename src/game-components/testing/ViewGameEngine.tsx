import React, { useEffect, useState } from "react";
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
import { ContextType, Entities, EntityKey } from "../../types/types";
import NewBall from "../balls/NewBall";
import { Entity, GameEngineUpdate } from "../../interfaces/gameEngine";
// import Player from "../characters/Player";
import Enemy from "../characters/Enemy";
import PlayerMoving from "../characters/PlayerMoving";
import PlayerBottomScreen from "../characters/PlayerBottomScreen";
import BallS from "../events/BallS";
import { useCollisions } from "../events/colision";
const boxSize = 50;
const { width, height } = Dimensions.get("window");

const ViewGameEngine = () => {
  const [trackPositions, setTrackPositions] = useState<[number, number]>([
    0, 0,
  ]);
  const movementSystem = (
    entities: Entities,
    { time, delta }: GameEngineUpdate
  ) => {
    const { player, enemy, ball1, ball2 } = entities;

    if (time && delta) {
      player.position[0] += player.speed[0] * delta;
      player.position[1] += player.speed[1] * delta;

      enemy.position[0] += enemy.speed[0] * delta;
      enemy.position[1] += enemy.speed[1] * delta;
    }
    // console.log("Player position:", player.position);
    // console.log("Ball 1 position:", ball1.position);
    // console.log("Ball 2 position:", ball2.position);

    return entities;
  };

  const entities2: Entities = {
    player: {
      position: [0, 0],
      speed: [1, 1],
      renderer: () => (
        <>
          <NewBall
            durationX={10}
            durationY={20}
            colorOne="yellow"
            colorTwo="white"
            position={[10, 60]}
          />
          <NewBall
            durationX={10}
            durationY={20}
            colorOne="yellow"
            colorTwo="white"
            position={[1, 260]}
          />

          <NewBall
            durationX={10}
            durationY={20}
            colorOne="yellow"
            colorTwo="white"
            position={[100, 100]}
          />
          <NewBall
            durationX={10}
            durationY={20}
            colorOne="yellow"
            colorTwo="white"
            position={[200, 200]}
          />
        </>
      ),
    },
    enemy: {
      position: [100, 100],
      speed: [-1, -1],
      renderer: () => <Enemy position={[100, 100]} />,
    },

    playerMoving: {
      position: [50, 150],
      radius: 30,
      speed: [-1, -1],
      renderer: () => (
        <PlayerMoving
          position={[50, 150]}
          onUpdatePlayerPosition={(x: number = 50, y: number = 10) =>
            setTrackPositions([x, y])
          }
          width={width}
          height={height}
          radius={30}
        />
      ),
    },
    playerBottomScreen: {
      position: [50, 150],
      speed: [-1, -1],
      renderer: () => (
        <PlayerBottomScreen
          position={[50, 150]}
          onUpdatePlayerPosition={(x: number, y: number) =>
            setTrackPositions([x, y])
          }
          width={width}
          height={height}
        />
      ),
    },
    ball1: {
      position: [100, 200],
      radius: 30,
      speed: [-1, -1],
      color: "red",
      renderer: () => <BallS position={[100, 200]} radius={30} color="red" />,
    },
    ball2: {
      position: [200, 300],
      radius: 50,
      speed: [-1, -1],
      color: "blue",
      renderer: () => <BallS position={[200, 300]} radius={50} color="blue" />,
    },
  };
  const entityKeys: EntityKey[] = [
    "player",
    "enemy",
    //"playerMoving",
    // "playerBottomScreen",
  ];
  const { onCollision } = useCollisions(entities2);
  useEffect(() => {
    if (onCollision("playerMoving", "ball1")) {
      console.log("Collision detected!");
    }
  }, [onCollision, onCollision("playerMoving", "ball1")]);
  return (
    <View style={styles.container}>
      <GameEngine systems={[movementSystem]} entities={entities2}>
        {/* <NewBall position={[0, 0]} durationX={10} durationY={20} /> */}
        {/* <Enemy position={[100, 100]} /> */}
        {entityKeys.map((key) => {
          const entity = entities2[key];
          return (
            <React.Fragment key={key}>
              {entity.renderer && entity.renderer()}
            </React.Fragment>
          );
        })}
      </GameEngine>
    </View>
  );
};
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
export default ViewGameEngine;
