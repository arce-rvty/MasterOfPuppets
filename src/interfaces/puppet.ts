
export enum GameStatus {
  Waiting = 1,
  Talking,
  Sleeping
}

export enum GlobalGameStatus {
  Playing,
  Podium 
}
export interface Puppet {
  name: string,
  orderGroup?: number,
  status: GameStatus,
  img: string,
  startTime?: Date,
  elapsedTime?: number
  interruptTime: number
}
