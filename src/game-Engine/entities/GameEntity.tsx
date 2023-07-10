import React, { useState, useEffect } from "react";
import { Entities } from "../../types/types";
import NewBall from "../../game-components/balls/NewBall";
import { intercept } from "mobx";
import Enemy from "../../game-components/characters/Enemy";
import BallS from "../../game-components/balls/BallS";
import PlayerMoving from "../../game-components/characters/PlayerMoving";
import PlayerBottomScreen from "../../game-components/characters/PlayerBottomScreen";
import BallAuto from "../../game-components/balls/BallAuto";
import { useCollisions } from "../../game-components/events/colision";
interface returnEntityInterface {
  width: number;
  height: number;
  playerPosition: [number, number];
  playerImageName: number;
}

const returnEntity = ({
  width,
  height,
  playerPosition: trackedPosition,
  playerImageName,
}: returnEntityInterface): Entities => {
  const [trackPositions, setTrackPositions] =
    useState<[number, number]>(trackedPosition);

  const entities: Entities = {
    // player: {
    //   position: [0, 0],
    //   speed: [1, 1],
    //   renderer: () => (
    //     <>
    //       <BallAuto
    //         durationX={10}
    //         durationY={10}
    //         radius={25}
    //         screenWidth={width}
    //         screenHeight={height}
    //         position={[25, 25]}
    //         colorOne="black"
    //         colorTwo="grey"
    //       />
    //       <BallAuto
    //         durationX={10}
    //         durationY={10}
    //         radius={25}
    //         screenWidth={width}
    //         screenHeight={height}
    //         position={[0, 0]}
    //       />

    //       <BallAuto
    //         durationX={10}
    //         durationY={10}
    //         radius={25}
    //         screenWidth={width}
    //         screenHeight={height}
    //         position={[5, 5]}
    //       />
    //       <BallAuto
    //         durationX={10}
    //         durationY={10}
    //         radius={25}
    //         screenWidth={width}
    //         screenHeight={height}
    //         position={[20, 20]}
    //       />
    //     </>
    //   ),
    // },
    enemy: {
      position: [100, 100],
      speed: [-1, -1],
      radius: 15,
      renderer: () => <Enemy position={[100, 100]} />,
    },

    playerMoving: {
      position: trackPositions,
      radius: 30,
      speed: [-1, -1],
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
    playerBottomScreen: {
      position: [50, 150],
      speed: [-1, -1],
      renderer: () => (
        <PlayerBottomScreen
          position={[50, 150]}
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
      radius: 25,
      speed: [-1, -1],
      color: "blue",
      renderer: () => (
        <BallAuto
          durationX={50}
          durationY={50}
          radius={25}
          screenWidth={width}
          screenHeight={height}
          position={[20, 20]}
          colorOne="blue"
        />
      ),
    },
    ballAuto: {
      position: [20, 20],
      radius: 25,
      speed: [-1, -2],
      color: "lightgrey",
      renderer: () => (
        <BallAuto
          durationX={10}
          durationY={10}
          radius={25}
          screenWidth={width}
          screenHeight={height}
          position={[25, 25]}
        />
      ),
    },
  };
  const { onCollision } = useCollisions(entities);
  useEffect(() => {
    if (onCollision(trackPositions, "ball1")) {
      console.log("Collision detected! ball1");
    }
    if (onCollision(trackPositions, "ball2")) {
      console.log("Collision detected! ball2");
    }
    // if (onCollision(trackPositions, "player")) {
    //   console.log("Collision detected! player");
    // }
    if (onCollision(trackPositions, "enemy")) {
      console.log("Collision detected! enemy");
    }
    if (onCollision(trackPositions, "ballAuto")) {
      console.log("Collision detected!  ballAuto");
    }
  }, [onCollision, trackPositions]);
  return entities;
};

export default returnEntity;
