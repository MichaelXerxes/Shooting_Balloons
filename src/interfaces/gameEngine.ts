import { NewBallRendererProps } from "./ballInterface";

export interface GameEngineUpdate {
    time?: number;
    delta?: number;
  }


  export interface Entity {
    position: [number, number];
    speed: [number, number];
    radius?:number;
    color?:string;
    renderer?: () => React.ReactNode;
  }

  export interface NewEntity {
    // position: [number, number];
    // speed?: [number, number];
    // radius:number;
    // renderer?: () => React.ReactNode;
    freePlayers:PlayersFreeMoving[];
    bottomPlayers:PlayersBottomScreen[];
    staticEnemies?: StaticEnemy[];
    movingEnemies?:MovingEnemy[];
  }

  export interface PlayersFreeMoving{
    position: [number, number];
    speed?: [number, number];
    radius:number;
    renderer?: () => React.ReactNode;
  }

  export interface PlayersBottomScreen{
    position: [number, number];
    speed?: [number, number];
    radius:number;
    renderer?: () => React.ReactNode;
  }
  export interface StaticEnemy{
    position: [number, number];
    speed?: [number, number];
    radius:number;
    renderer?: () => React.ReactNode;
  }
  export interface MovingEnemy{
    position: [number, number];
    speed?: [number, number];
    radius:number;
    renderer?: () => React.ReactNode;
  }

