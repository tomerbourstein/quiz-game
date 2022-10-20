import Box from "@mui/material/Box";
import classes from "./Score.module.css";
const Score = () => {
  const createData = (nickname, points) => {
    return { nickname, points };
  };

  const score = [
    createData("Dave", 12),
    createData("Neil", 20),
    createData("Miri", 16),
  ];
  return (
    <section>
      <Box className={classes.header}> Top Scorers!</Box>

      <Box className={classes.podium}>
        <Box className={classes.silver}>
          <Box className={classes.user}> {score[2].nickname} </Box>
          {score[2].points + " points"}
        </Box>
        <Box className={classes.gold}>
          <Box className={classes.user}> {score[1].nickname} </Box>
          {score[1].points + " points"}
        </Box>
        <Box className={classes.bronze}>
          <Box className={classes.user}> {score[0].nickname} </Box>
          {score[0].points + " points"}
        </Box>
      </Box>
    </section>
  );
};

export default Score;
