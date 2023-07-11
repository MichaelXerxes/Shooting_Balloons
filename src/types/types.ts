import { Entity,NewEntity,PlayersBottomScreen,PlayersFreeMoving } from "../interfaces/gameEngine";

export type ContextType = { offsetX: number; offsetY: number };;


//export type Entities = Record<string, Entity>;


export type EntityKey = 
//"player" | 
"enemy"|"playerMoving"|"playerBottomScreen"|"ball1"|"ball2"|"ballAuto";

export  type Entities = {
    [key in EntityKey]: Entity;
  };
  

export type NewEntityKey = 
"player" | 
"enemy"|
//"playerMoving"|"playerBottomScreen"|"ball1"|"ball2"|
"ballAuto";

export  type NewEntities = {
    [key in NewEntityKey]: NewEntity;
  };

export type NewEntityArrayKey = 'freePlayers' | 'bottomPlayers' | 'staticEnemies' | 'movingEnemies';

export type EntityData = PlayersFreeMoving |PlayersBottomScreen ;
//| EnemiesFreeMoving | BallAutoFreeMoving;
