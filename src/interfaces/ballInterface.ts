import { Entity } from "./gameEngine";
export interface BallProps{
    ballSize?:number;
    durationX:number;
    durationY:number;
    colorOne?:string;
    colorTwo?:string;
    // initialStartX?:number;
    // initialStartY?:number;
    screenWidth?:number;
    screenHeight?:number;
    directionValueX?:number;
    directionValueY?:number;
    position: [number, number];
    radius:number;
};

export  interface NewBallRendererProps {
    entity: Entity;
    position: [number, number];
    speed: [number, number];
  }


