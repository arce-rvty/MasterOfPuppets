import { useEffect, useState } from "react";
import "./App.css";
import { GameStatus, Puppet } from "./interfaces/puppet";
import MainContainer from "./components/MainContainer";
import data from './data/puppets.json';

function App() {
  const [people, setPeople] = useState<Puppet[]>([]);

  const setNextPuppet = () => {
    // Get the current speaker and move to sleeping
    const peopleCopy = [...people];
    const speaker = peopleCopy.find(p => p.status == GameStatus.Talking);
    if (speaker) {
      speaker.status = GameStatus.Sleeping;
    }
    // Then select new puppet:
    const peopleToChoose = peopleCopy.filter(p => p.status == GameStatus.Waiting)
    // Get random from people in waiting:
    if (peopleToChoose.length == 0) return;
    const randomIndex = Math.floor(Math.random() * peopleToChoose.length);
    // Set new one:
    peopleToChoose[randomIndex].status = GameStatus.Talking
    setPeople(peopleCopy);
  };

  const getNameToShow = () => {
    const currentSpeaker = people.find((p) => p.status == GameStatus.Talking);
    if (currentSpeaker) return currentSpeaker.name;
    else return "Waiting puppets...";
  };

  useEffect(() => {
    const peopleList: Puppet[] = []
    data.puppets.forEach(p => {
      console.log(p)
      peopleList.push({
        name: p.name,
        status: GameStatus.Waiting
      })
    });
    setPeople(peopleList);
  }, []);

  return (
    <>
      <div>
        <img src={"/images/doll.png"} className="logo react" />
      </div>
      <div style={{ minHeight: "400px" }}>
        <MainContainer listPuppets={people} />
      </div>
      <h1>{getNameToShow()}</h1>

      <div className="card">
        <button onClick={() => setNextPuppet()}>NEXT PUPPET</button>
      </div>
      <p className="read-the-docs">
        Tyranny and slavery is the only way
      </p>
    </>
  );
}

export default App;
