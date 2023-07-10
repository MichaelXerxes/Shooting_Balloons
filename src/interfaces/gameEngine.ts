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