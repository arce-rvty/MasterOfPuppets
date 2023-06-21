import { GameStatus, Puppet } from "./interfaces/puppet";
import data from "./data/puppets.json";

export const getNameToShow = (people: Puppet[]) => {
  const currentSpeaker = people.find((p) => p.status == GameStatus.Talking);
  if (currentSpeaker) return currentSpeaker.name;
  else return "Waiting puppets...";
};

export const getImgToShow = (people: Puppet[]) => {
  const currentSpeaker = people.find((p) => p.status == GameStatus.Talking);
  if (currentSpeaker) return currentSpeaker.img;
  else return "/images/doll.png";
};

export const getPuppetsFromFile = () => {
  const peopleList: Puppet[] = [];
  data.puppets.forEach((p) => {
    console.log(p);
    peopleList.push({
      name: p.name,
      status: GameStatus.Waiting,
      img: "/images/" + p.name + ".png",
    });
  });
  return peopleList;
};
