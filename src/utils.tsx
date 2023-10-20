import { GameStatus, Puppet } from "./interfaces/puppet";

export const getNameToShow = (people: Puppet[]) => {
  const currentSpeaker = people.find((p) => p.status == GameStatus.Talking);
  if (currentSpeaker) return currentSpeaker.name;
  else return "Waiting puppets...";
};

export const getCurrentPuppet = (people: Puppet[]): Puppet | undefined => {
  return people.find(
    (p: Puppet) => p.status == GameStatus.Talking
  );
};

const sortPuppets = (people: Puppet[]) => {
  people.sort((a, b) => {
    if (a.elapsedTime !== undefined && b.elapsedTime !== undefined)
      return a.elapsedTime - b.elapsedTime;
    return 0;
  });
};

export const getWinnerName = (people: Puppet[]): string => {
  if (people.length == 0) return "error";
  sortPuppets(people);
  return people[0].name;
};

export const getLoserName = (people: Puppet[]): string => {
  if (people.length == 0) return "error";
  sortPuppets(people);
  return people[people.length - 1].name;
};

export const millisToMinutesAndSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (+seconds < 10 ? "0" : "") + seconds;
};
