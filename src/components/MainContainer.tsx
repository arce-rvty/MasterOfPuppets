import { Grid } from "@mui/material";
import { GameStatus, GlobalGameStatus, Puppet } from "../interfaces/puppet";
import { ListPuppets } from "./ListPuppets";
import {
  getCurrentPuppet,
  getLoserName,
  getNameToShow,
  getWinnerName,
} from "../utils";
import TimerController from "./TImerController";

const MainContainer = (props: {
  listPuppets: Puppet[];
  gameStatus: GlobalGameStatus;
  podium: boolean;
  changeSpeakerPuppet: (name: string) => void;
  speaker: string;
}) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ListPuppets
            list={props.listPuppets.filter(
              (p) => p.status == GameStatus.Waiting
            )}
            speaker={props.speaker}
            selectPuppet={(name) => props.changeSpeakerPuppet(name)}
          />
        </Grid>
        <Grid item xs={4}>
          <div className="main-puppet"
            onClick={() => props.changeSpeakerPuppet(getCurrentPuppet(props.listPuppets)?.name ?? '')}
          >
            {props.gameStatus === GlobalGameStatus.Playing
              ? getNameToShow(props.listPuppets)
              : props.podium
                ? getWinnerName(props.listPuppets)
                : getLoserName(props.listPuppets)}
          </div>
          <TimerController puppet={getCurrentPuppet(props.listPuppets)} />
        </Grid>
        <Grid item xs={4}>
          <ListPuppets
            list={props.listPuppets.filter(p => p.status == GameStatus.Sleeping)}
            speaker={props.speaker}
            selectPuppet={(name) => props.changeSpeakerPuppet(name)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
