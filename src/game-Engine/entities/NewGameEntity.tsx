import { GameEngine } from "react-native-game-engine";
import { NewEntities, NewEntityArrayKey } from "../../types/types";
import { PlayerProps, EnemyProps } from "../../interfaces/characters";
import { EntityData } from "../../types/types";
import React, { useState, useEffect } from "react";
import PlayerMoving from "../../game-components/characters/PlayerMoving";
import BallAuto from "../../game-components/balls/BallAuto";
import BallS from "../../game-components/balls/BallS";

interface GameEntityInterface {
  players: PlayersInterface[];
  enemies: EnemisInterface[];
}
interface PlayersInterface {
  player: PlayerProps;
}
interface EnemisInterface {
  enemy: EnemyProps;
}
interface EntityInterface {
  width: number;
  height: number;
  playerPosition: [number, number];
  playerImageName: number;
}

const newGameEntity = ({
  width,
  height,
  playerPosition: trackedPosition,
  playerImageName,
}: EntityInterface): NewEntities => {
  const [trackPositions, setTrackPositions] =
    useState<[number, number]>(trackedPosition);
  const [entities, setEntities] = useState<NewEntities>({
    player: {
      freePlayers: [
        {
          position: [0, 0],
          radius: 25,
          renderer: () => (
            <PlayerMoving
              position={trackPositions}
              onUpdatePlayerPosition={(x: number, y: number) =>
                setTrackPositions([x, y])
              }
              width={width}
              height={height}
              radius={30}
              playerImageNameIndex={playerImageName}
            />
          ),
        },
        {
          position: [0, 0],
          radius: 25,
          renderer: () => (
            <BallS position={[100, 200]} radius={30} color="red" />
          ),
        },
      ],
      bottomPlayers: [],
    },
    enemy: { freePlayers: [], bottomPlayers: [] },
    ballAuto: { freePlayers: [], bottomPlayers: [] },
  });
  const addEntity = (
    entityType: keyof NewEntities,
    arrayKey: NewEntityArrayKey,
    entityData: EntityData
  ) => {
    setEntities((prevState: NewEntities) => {
      const entityArrays = prevState[entityType];
      if (arrayKey in entityArrays) {
        return {
          ...prevState,
          [entityType]: {
            ...entityArrays,
            [arrayKey]: [
              ...(entityArrays[arrayKey] as EntityData[]),
              entityData,
            ],
          },
        };
      } else {
        console.warn(
          `Array key "${arrayKey}" does not exist on entity type "${entityType}"`
        );
        return prevState;
      }
    });
  };

  const removeEntity = (entityType: keyof NewEntities, index: number) => {
    setEntities((prevState) => ({
      ...prevState,
      [entityType]: {
        ...prevState[entityType],
        freePlayers: prevState[entityType].freePlayers.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  return entities;
};

export default newGameEntity;
