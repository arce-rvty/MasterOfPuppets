import { Grid } from "@mui/material";
import { useRef } from "react";

export const SoundController = (props: { playSound: boolean }) => {
  const audioNextPlayer = useRef<HTMLAudioElement | null>(null);

  const { playSound } = props;
  if (playSound && audioNextPlayer.current !== null) {
    audioNextPlayer.current.play()
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
      <audio style={{ visibility: "hidden" }} src={"audio/success.mp3"} ref={audioNextPlayer} controls />
    </>
  );
};
