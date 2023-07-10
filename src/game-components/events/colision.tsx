import { useState } from "react";
import { Entities } from "../../types/types";
// interface Entity {
//   position: [number, number];
//   radius: number;
// }
import { Entity } from "../../interfaces/gameEngine";
// interface Entities {
//   [key: string]: Entity;
// }

interface Collisions {
  [key: string]: boolean;
}

export const useCollisions = (entities: Entities) => {
  const [collisions, setCollisions] = useState<Collisions>({});

  const onCollision = (entity1: keyof Entities, entity2: keyof Entities) => {
    const { position: pos1, radius: r1 } = entities[entity1] as Entity;
    const { position: pos2, radius: r2 } = entities[entity2] as Entity;
    console.log("Entity 1 position:", pos1);
    console.log("Entity 1 radius:", r1);
    console.log("Entity 2 position:", pos2);
    console.log("Entity 2 radius:", r2);
    const dx = pos2[0] - pos1[0];
    const dy = pos2[1] - pos1[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (r1 !== undefined && r2 !== undefined && distance <= r1 + r2) {
      const key = `${entity1}-${entity2}`;
      if (!collisions[key]) {
        setCollisions((prevCollisions) => ({
          ...prevCollisions,
          [key]: true,
        }));
        return true;
      }
    } else {
      const key = `${entity1}-${entity2}`;
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
