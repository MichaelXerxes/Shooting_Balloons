import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import returnEntity from "./entities/GameEntity";
import { Entities, EntityKey } from "../types/types";
import { GameEngineUpdate } from "../interfaces/gameEngine";

const boxSize = 50;
const { width, height } = Dimensions.get("window");
interface Props {
  playerImageName?: number;
}
const CustomGameEngine: React.FC<Props> = ({ playerImageName = 1 }) => {
  const [trackPositions, setTrackPositions] = useState<[number, number]>([
    0, 0,
  ]);
  const movementSystem = (
    entities: Entities,
    { time, delta }: GameEngineUpdate
  ) => {
    const {
      // player,
      enemy,
      ball1,
      ball2,
    } = entities;

    if (time && delta) {
      //   player.position[0] += player.speed[0] * delta;
      //   player.position[1] += player.speed[1] * delta;

      enemy.position[0] += enemy.speed[0] * delta;
      enemy.position[1] += enemy.speed[1] * delta;
    }

    return entities;
  };
  const entities2 = returnEntity({
    width,
    height,
    playerPosition: trackPositions,
    playerImageName: playerImageName,
  });
  const entityKeys: EntityKey[] = [
    // "player",
    // "enemy",
    //"playerMoving",
    // "playerBottomScreen",
  ];

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
export default CustomGameEngine;
