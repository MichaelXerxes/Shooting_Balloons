import { makeAutoObservable } from "mobx";

class GameStore {
  score: number = 0;
  time: number = 0;
  userName: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setScore(score: number) {
    this.score = score;
  }

  setTime(time: number) {
    this.time = time;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }
}

export default new GameStore();
