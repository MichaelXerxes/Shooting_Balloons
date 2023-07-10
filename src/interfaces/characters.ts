export interface PlayerProps {
    position: [number, number];
    onUpdatePlayerPosition?: (x: number, y: number) => void;
    width:number;
    height:number;
    radius?:number;
    playerImageNameIndex?: number;
  }


  export interface EnemyProps {
    position: [number, number];
  }