import { Button, Grid } from "@mui/material";
import { useRef } from "react";

export const SoundController = (props: {playSound: boolean}) => {
  const audioErrorRef = useRef();
  const audioRandomRef = useRef();
  const audioBackground = useRef();
  const audioNextPlayer = useRef();

  const {playSound} = props;
  if (playSound) {
    audioNextPlayer.current.play()
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
      <Button variant="contained" color="primary" onClick={() => audioErrorRef.current.play()}> Error </Button>
        </Grid>
        <Grid item xs={4}>
          <audio src={"/audio/background.mp3"} ref={audioBackground} controls />
        </Grid>
        <Grid item xs={4}>
      <Button variant="contained" color="primary" onClick={() => audioRandomRef.current.play()}> Random </Button>
        </Grid>
      </Grid>
      <audio style={{ visibility: "hidden" }} src={"/audio/fail.mp3"} ref={audioErrorRef} controls />
      <audio style={{ visibility: "hidden" }} src={"/audio/random.mp3"} ref={audioRandomRef} controls />
      <audio style={{ visibility: "hidden" }} src={"/audio/success.mp3"} ref={audioNextPlayer} controls />
    </>
  );
};
