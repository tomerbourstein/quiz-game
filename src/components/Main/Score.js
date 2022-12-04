import { useState } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";

import GoldTrophy from "../../images/trophy-gold.png";
import SilverTrophy from "../../images/trophy-silver.png";
import BronzeTrophy from "../../images/trophy-bronze.png";

import classes from "./Score.module.css";

const Score = () => {
  const getPlayers = useSelector((state) => state.database.players);
  const [open, setOpen] = useState(true);

  const handleClose = (value) => {
    setOpen(false);
  };

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
      <Dialog onClose={handleClose} open={open}>
        <Card className={classes.card}>
          <Box className={classes.header}> Top Scorers!</Box>
          <Box className={classes.podium}>
            <Box className={classes.podiumBox}>
              <Box className={classes.user}> {podium()[1].nickname} </Box>
              <Box className={classes.silver}>
                <p>{podium()[1].score + " points"}</p>
                <div>
                  <img src={SilverTrophy} alt="silver trophy" />
                </div>
              </Box>
            </Box>

            <Box className={classes.podiumBox}>
              <Box className={classes.user}> {podium()[0].nickname} </Box>
              <Box className={classes.gold}>
                <p>{podium()[0].score + " points"}</p>
                <div>
                  <img src={GoldTrophy} alt="gold trophy" />
                </div>
              </Box>
            </Box>

            <Box className={classes.podiumBox}>
              <Box className={classes.user}> {podium()[2].nickname}</Box>
              <Box className={classes.bronze}>
                <p>{podium()[2].score + " points"}</p>
                <div>
                  <img src={BronzeTrophy} alt="bronze trophy" />
                </div>
              </Box>
            </Box>
          </Box>
        </Card>
      </Dialog>
    </section>
  );
};

export default Score;
