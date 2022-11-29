import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import classes from "./Score.module.css";
const Score = () => {
  const getPlayers = useSelector((state) => state.database.players);

  // Display "Unavailable" if there less than three players, and sort them in descending order.
  const podium = () => {
    const DUMMY_SCORE = { nickname: "Unavailable", score: 0 };
    let players;
    if (getPlayers.length === 2) {
      players = [...getPlayers, DUMMY_SCORE];
    } else if (getPlayers.length === 1) {
      players = [...getPlayers, DUMMY_SCORE, DUMMY_SCORE];
    } else if (getPlayers.length === 0) {
      players = [DUMMY_SCORE, DUMMY_SCORE, DUMMY_SCORE];
    } else {
      players = [...getPlayers];
    }

    const nums = players
      .filter((n) => n.hasOwnProperty("id"))
      .sort((a, b) => b.score - a.score); // If the data type of a given element is a number store it in this array (and then sort numerically)
    const non_nums = players.filter((x) => !x.hasOwnProperty("id")).sort(); // Store everything that is not a number in an array (and then sort lexicographically)
    const rankedPlayers = [...nums, ...non_nums]; // combine the two arrays
    return rankedPlayers;
  };

  return (
    <section>
      <Box className={classes.header}> Top Scorers!</Box>
      <Box className={classes.podium}>
        <Box className={classes.silver}>
          <Box className={classes.user}> {podium()[1].nickname} </Box>
          {podium()[1].score + " points"}
        </Box>
        <Box className={classes.gold}>
          <Box className={classes.user}> {podium()[0].nickname} </Box>
          {podium()[0].score + " points"}
        </Box>
        <Box className={classes.bronze}>
          <Box className={classes.user}> {podium()[2].nickname}</Box>
          {podium()[2].score + " points"}
        </Box>
      </Box>
    </section>
  );
};

export default Score;
