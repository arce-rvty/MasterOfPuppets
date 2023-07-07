
export enum GameStatus {
  Waiting = 1,
  Talking,
  Sleeping
}
export interface Puppet {
  name: string,
  status: GameStatus,
  img: string,
  startTime?: Date
}
