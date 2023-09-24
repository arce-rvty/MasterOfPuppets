import { useEffect, useState } from "react";
import "./App.css";
import { GameStatus, GlobalGameStatus, Puppet } from "./interfaces/puppet";
import MainContainer from "./components/MainContainer";
import { Button } from "@mui/material";
import "animate.css";
import { getCurrentPuppet } from "./utils";
import { SoundController } from "./components/SoundContoller";
import MainImage from "./components/MainImage";
import WaitingLoadFile from "./components/WaitingLoadFile";
import { PuppetOrder } from "./interfaces/order";
import { OrderService } from "./services/orderService";

function App() {
  const [people, setPeople] = useState<Puppet[]>([]);
  const [playSound, setPlaySound] = useState(false);
  const [gameStatus, setGameStatus] = useState<GlobalGameStatus>(
    GlobalGameStatus.Playing
  );
  const [podium, setPodium] = useState<boolean>(false);
  const [orderCriterial, setOrderCriterial] = useState<PuppetOrder>(PuppetOrder.File);
  const [speaker, setSpeaker] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStatus == GlobalGameStatus.Podium) {
        setPlaySound(false);
        setPodium((prev) => !prev);
      }
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [gameStatus]);

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
    const randomIndex = OrderService.getNextPersonIndex(peopleToChoose, orderCriterial);
    // Set new one:
    peopleToChoose[randomIndex].status = GameStatus.Talking;
    peopleToChoose[randomIndex].startTime = new Date();
    // Play audio:
    setPlaySound(true);
    setPeople(peopleCopy);
    setSpeaker(peopleToChoose[randomIndex].name);
  };

  const currentPuppet = getCurrentPuppet(people);

  const changeSpeakerPuppet = (newSpeakerName: string) => {
    if (gameStatus == GlobalGameStatus.Podium) return;
    const newSpeaker = people.find(person => person.name == newSpeakerName);
    if (newSpeaker == undefined || currentPuppet == undefined) return;

    // Scenario 1: Click on current speaker
    if (currentPuppet.name == newSpeakerName) {
      const prevSpeaker = people.find(person => person.name == speaker);

      // Prevent doble click same name
      if (prevSpeaker?.name == currentPuppet.name) return;

      if (prevSpeaker && prevSpeaker.startTime) {
        const delayTime = Date.now() - prevSpeaker.startTime.getTime();
        prevSpeaker.interruptTime += delayTime;
        currentPuppet.interruptTime -= delayTime;
      }
    }
    // Scenario 2: Click other new speaker:
    else {
      // Start the speech of the interrupter
      newSpeaker.startTime = new Date();
    }
    setSpeaker(newSpeakerName);
  };

  return (
    <>
      <MainImage
        gameStatus={gameStatus}
        currentPuppet={currentPuppet}
        podium={podium} />
      {people.length === 0 ? (
        <WaitingLoadFile
          setOrderCriterial={setOrderCriterial}
          setPeople={function (puppets: Puppet[]): void {
            setPeople(puppets);
          }}
        />
      ) : (
        <>
          <div style={{ minHeight: "300px" }}>
            <MainContainer
              listPuppets={people}
              gameStatus={gameStatus}
              podium={podium}
              changeSpeakerPuppet={changeSpeakerPuppet}
              speaker={speaker}
            />
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
        </>
      )}
    </>
  );
}

export default App;
