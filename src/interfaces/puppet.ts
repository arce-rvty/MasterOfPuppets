
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
  status: GameStatus,
  img: string,
  startTime?: Date,
  elapsedTime?: number
}
