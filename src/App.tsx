import { useState } from "react";
import "./App.css";
import { GameStatus, GlobalGameStatus, Puppet } from "./interfaces/puppet";
import MainContainer from "./components/MainContainer";
import { Button } from "@mui/material";
import "animate.css";
import { getCurrentPuppet } from "./utils";
import { SoundController } from "./components/SoundContoller";

function App() {
  const [people, setPeople] = useState<Puppet[]>([]);
  const [playSound, setPlaySound] = useState(false);
  const [gameStatus, setGameStatus] = useState<GlobalGameStatus>(
    GlobalGameStatus.Playing
  );

  const setNextPuppet = () => {
    // Get the current speaker and move to sleeping
    const peopleCopy = [...people];
    const speaker = peopleCopy.find((p) => p.status == GameStatus.Talking);
    if (speaker) {
      speaker.status = GameStatus.Sleeping;
      if (speaker.startTime) {
        speaker.elapsedTime = Date.now() - speaker.startTime.getTime();
      }
    }
    // Then select new puppet:
    const peopleToChoose = peopleCopy.filter(
      (p) => p.status == GameStatus.Waiting
    );
    // Get random from people in waiting:
    if (peopleToChoose.length == 0) {
      setGameStatus(GlobalGameStatus.Podium);
      return;
    }
    const randomIndex = Math.floor(Math.random() * peopleToChoose.length);
    // Set new one:
    peopleToChoose[randomIndex].status = GameStatus.Talking;
    peopleToChoose[randomIndex].startTime = new Date();
    // Play audio:
    setPlaySound(true);
    setPeople(peopleCopy);
  };
  const currentPuppet = getCurrentPuppet(people);

  const parseUserInputFile = async (e: any) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const peopleList: Puppet[] = [];
      const dataRaw: any = JSON.parse(e.target?.result as string);
      dataRaw.puppets.forEach((p: any) => {
        peopleList.push({
          name: p.name,
          status: GameStatus.Waiting,
          img: "images/" + p.image,
        });
      });
      setPeople(peopleList);
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <>
      <div>
        {gameStatus === GlobalGameStatus.Playing ? (
          <img
            src={
              currentPuppet == undefined
                ? "images/doll.png"
                : currentPuppet.img
            }
            className="logo react"
          />
        ) : (
          <img src={"images/banana.gif"} className="logo react" />
        )}
      </div>
      {people.length === 0 ?
        <>
          <div className="main-puppet">
            Scrum Master Game
          </div>
          <Button
            size="large"
            variant="contained"
            color="error"
          >
            Upload
            <input style={{ opacity: 0, width: '20px' }} type="file" accept=".json" onChange={(e) => parseUserInputFile(e)}>
            </input>
            File
          </Button>
        </> : <>
          <div style={{ minHeight: "300px" }}>
            <MainContainer listPuppets={people} gameStatus={gameStatus} />
          </div>
          <div className="card">
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={() => setNextPuppet()}
            >
              NEXT PUPPET
            </Button>
          </div>
          <p className="read-the-docs">
            <div>Scrum Master's proverb:</div>
            Tyranny and slavery is the only way
          </p>
          <SoundController playSound={playSound} />

        </>}

    </>
  );
}

export default App;
