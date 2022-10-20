import { Fragment } from "react";
import Players from "./Players";
import Quiz from "./Quiz";
import Score from "./Score";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import classes from "./Main.module.css";

const Main = () => {
  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography> When Ready, Click Start!</Typography>
          <CardActions>
            <Button>Start Quiz</Button>
          </CardActions>
          <Box className={classes.box}>
            <Players />
            <Quiz />
          </Box>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <Score />
      </Card>

      <Card className={classes.card}> 
      <CardActions className={classes.actionButtons}>
      <Button> Restart Quiz </Button>
      <Button> Exit Game Room </Button>
      </CardActions>
      </Card>
    </Fragment>
  );
};

export default Main;
