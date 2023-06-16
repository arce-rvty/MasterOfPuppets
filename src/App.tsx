import { useRef, useState } from "react";
import "./App.css";
import { GameStatus, Puppet } from "./interfaces/puppet";
import MainContainer from "./components/MainContainer";
import { Button } from "@mui/material";
import 'animate.css';
import { getNameToShow, getPuppetsFromFile } from "./utils";


function App() {
  const [people, setPeople] = useState<Puppet[]>(getPuppetsFromFile());
  const audioErrorRef = useRef();
  const audioRandomRef = useRef();
  const audioNextPlayer = useRef();

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
    audioNextPlayer.current.play()
    setPeople(peopleCopy);
  };

  return (
    <>
      <div>
        <img src={"/images/doll.png"} className="logo react" />
      </div>
      <div style={{ minHeight: "300px" }}>
        <MainContainer listPuppets={people} />
      </div>
      <div className="main-puppet">{getNameToShow(people)}</div>
      <p className="read-the-docs">
        Tyranny and slavery is the only way
      </p>

      <div className="card">
        <Button size="large" variant="contained" color="error" onClick={() => setNextPuppet()}>NEXT PUPPET</Button>
      </div>

      <Button variant="contained" color="primary" onClick={() => audioErrorRef.current.play()}> Error </Button>
      <audio style={{ visibility: "hidden" }} src={"/audio/fail.mp3"} ref={audioErrorRef} controls />
      <audio style={{ visibility: "hidden" }} src={"/audio/random.mp3"} ref={audioRandomRef} controls />
      <Button variant="contained" color="primary" onClick={() => audioRandomRef.current.play()}> Random </Button>

      <div>
        <audio style={{ visibility: "hidden" }} src={"/audio/success.mp3"} ref={audioNextPlayer} controls />
      </div>
    </>
  );
}

export default App;
