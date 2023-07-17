import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import returnEntity from "./entities/GameEntity";
import { Entities, EntityKey, NewEntities, NewEntityKey } from "../types/types";
import {
  GameEngineUpdate,
  NewEntity,
  PlayersFreeMoving,
} from "../interfaces/gameEngine";
import { newGameEntity } from "./entities/NewGameEntity";
import { NewEntityArrayKey } from "../types/types";
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
    entities: NewEntities,
    { time, delta }: GameEngineUpdate
  ) => {
    if (time && delta) {
      const entityKeys: NewEntityKey[] = ["player", "enemy", "ballAuto"];

      entityKeys.forEach((key) => {
        const entity = entities[key];
        // Move all freePlayers of each entity
        entity.freePlayers.forEach((freePlayer: PlayersFreeMoving) => {
          freePlayer.position[0] += 0.1 * delta;
          freePlayer.position[1] += 0.1 * delta;
        });
      });
    }

    return entities;
  };
  // const entities2 = returnEntity({
  //   width,
  //   height,
  //   playerPosition: trackPositions,
  //   playerImageName: playerImageName,
  // });
  // const entityKeys: EntityKey[] = [
  //   // "player",
  //   // "enemy",
  //   //"playerMoving",
  //   // "playerBottomScreen",
  // ];
  const NewEntityKeys: NewEntityKey[] = [
    "player",
    // "enemy",
    //"playerMoving",
    // "playerBottomScreen",
  ];
  const gameState = newGameEntity({
    width: width,
    height: height,
    playerPosition: trackPositions,
    playerImageName: playerImageName,
  });
  console.log(gameState.entities);
  return (
    <View style={styles.container}>
      <GameEngine systems={[movementSystem]} entities={gameState.entities}>
        {NewEntityKeys.map((key) => {
          const entity = gameState.entities[
            key as keyof NewEntities
          ] as NewEntity;
          return (
            entity &&
            entity.freePlayers.map(
              (freePlayer: PlayersFreeMoving, index: number) => (
                <React.Fragment key={`${key}-freePlayer-${index}`}>
                  {freePlayer.renderer && freePlayer.renderer()}
                </React.Fragment>
              )
            )
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
