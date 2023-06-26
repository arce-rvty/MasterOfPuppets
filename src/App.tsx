import { useState } from "react";
import "./App.css";
import { GameStatus, Puppet } from "./interfaces/puppet";
import MainContainer from "./components/MainContainer";
import { Button } from "@mui/material";
import 'animate.css';
import { getCurrentPuppet, getPuppetsFromFile } from "./utils";
import { SoundController } from "./components/SoundContoller";


function App() {
  const [people, setPeople] = useState<Puppet[]>(getPuppetsFromFile());
  const [playSound, setPlaySound] = useState(false);

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
    // Play audio:
    setPlaySound(true);
    setPeople(peopleCopy);
  };
  const currentPuppet = getCurrentPuppet(people);

  return (
    <>
      <div>
        <img src={currentPuppet == undefined ? "/images/doll.png" : currentPuppet.img} className="logo react" />
      </div>
      <div style={{ minHeight: "300px" }}>
        <MainContainer listPuppets={people} />
      </div>

      <div className="card">
        <Button size="large" variant="contained" color="error" onClick={() => setNextPuppet()}>NEXT PUPPET</Button>
      </div>
      <p className="read-the-docs">
        Tyranny and slavery is the only way
      </p>
      <SoundController playSound={playSound} />
    </>
  );
}

export default App;
