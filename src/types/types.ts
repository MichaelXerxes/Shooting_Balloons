import { Entity } from "../interfaces/gameEngine";

export type ContextType = { offsetX: number; offsetY: number };;


//export type Entities = Record<string, Entity>;


export type EntityKey = 
//"player" | 
"enemy"|"playerMoving"|"playerBottomScreen"|"ball1"|"ball2"|"ballAuto";

export  type Entities = {
    [key in EntityKey]: Entity;
  };
  