import { Grid } from "@mui/material";
import { GameStatus, Puppet } from "../interfaces/puppet";
import { ListPuppets } from "./ListPuppets";

const MainContainer = (props: { listPuppets: Puppet[] }) => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ListPuppets list={props.listPuppets.filter( p => p.status == GameStatus.Waiting)}/>
        </Grid>
        <Grid item xs={6}>
          <ListPuppets list={props.listPuppets.filter( p => p.status == GameStatus.Sleeping)}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainContainer;
