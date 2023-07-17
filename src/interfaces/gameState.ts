import { NewEntities,NewEntityArrayKey,EntityData } from "../types/types";
export interface GameEntityState {
    entities: NewEntities;
    addEntity: (
      entityType: keyof NewEntities,
      arrayKey: NewEntityArrayKey,
      entityData: EntityData
    ) => void;
    removeEntity: (entityType: keyof NewEntities, index: number) => void;
  }