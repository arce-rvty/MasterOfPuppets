import { Grid } from "@mui/material";
import { GameStatus, Puppet } from "../interfaces/puppet";
import { ListPuppets } from "./ListPuppets";
import { getNameToShow } from "../utils";

const MainContainer = (props: { listPuppets: Puppet[] }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ListPuppets list={props.listPuppets.filter( p => p.status == GameStatus.Waiting)}/>
        </Grid>
        <Grid item xs={4}>
          <div className="main-puppet">{getNameToShow(props.listPuppets)}</div>
        </Grid>
        <Grid item xs={4}>
          <ListPuppets list={props.listPuppets.filter( p => p.status == GameStatus.Sleeping)}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
