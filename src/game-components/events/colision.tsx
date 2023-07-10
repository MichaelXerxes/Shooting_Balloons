import { useState } from "react";
import { Entities } from "../../types/types";
import { Entity } from "../../interfaces/gameEngine";

interface Collisions {
  [key: string]: boolean;
}

export const useCollisions = (entities: Entities) => {
  const [collisions, setCollisions] = useState<Collisions>({});

  const onCollision = (
    positionPlayer: [number, number],
    entity2: keyof Entities
  ) => {
    const [x1, y1] = positionPlayer;
    const r1: number = 30;
    const { position: pos2, radius: r2 } = entities[entity2] as Entity;
    // console.log("Entity 1 position:", positionPlayer);
    // console.log("Entity 1 radius:", r1);
    // console.log("Entity 2 position:", pos2);
    // console.log("Entity 2 radius:", r2);
    const dx = pos2[0] - x1;
    const dy = pos2[1] - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (r1 !== undefined && r2 !== undefined && distance <= r1 + r2) {
      const key = `${positionPlayer}-${entity2}`;
      if (!collisions[key]) {
        setCollisions((prevCollisions) => ({
          ...prevCollisions,
          [key]: true,
        }));
        return true;
      }
    } else {
      const key = `${positionPlayer}-${entity2}`;
      if (collisions[key]) {
        setCollisions((prevCollisions) => ({
          ...prevCollisions,
          [key]: false,
        }));
      }
    }

    return false;
  };

  return { onCollision };
};
