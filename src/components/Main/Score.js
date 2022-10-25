import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import classes from "./Score.module.css";
const Score = () => {
  const getPlayers = useSelector((state) => state.database.players);

  let players;
  if (getPlayers.length < 3) {
    players = [
      ...getPlayers,
      { nickname: "Unavailable", score: "Unavailable" },
    ];
  }
  const rankingPlayers = players.sort((a, b) => b.score - a.score);

  console.log(getPlayers);
  console.log(rankingPlayers);

  return (
    <section>
      <Box className={classes.header}> Top Scorers!</Box>

      <Box className={classes.podium}>
        <Box className={classes.silver}>
          <Box className={classes.user}> {rankingPlayers[1].nickname} </Box>
          {rankingPlayers[1].score + " points"}
        </Box>
        <Box className={classes.gold}>
          <Box className={classes.user}> {rankingPlayers[0].nickname} </Box>
          {rankingPlayers[0].score + " points"}
        </Box>
        <Box className={classes.bronze}>
          <Box className={classes.user}> {rankingPlayers[2].nickname}</Box>
          {rankingPlayers[2].score === "Unavailable"
            ? "Unavailable"
            : rankingPlayers[2].score + " points"}
        </Box>
      </Box>
    </section>
  );
};

export default Score;
