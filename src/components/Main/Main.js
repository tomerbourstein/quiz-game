import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import { writeStartQuizData } from "../../util/Firebase";
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

let isInitial = true;
const Main = () => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);
  const quizShow = useSelector((state) => state.ui.quizShow);
  const podiumShow = useSelector((state) => state.ui.podiumShow);
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    if (isInitial) {
      if (isAdmin) {
        const triviaRequest = async () => {
          const response = await fetch("https://opentdb.com/api.php?amount=10");
          const data = await response.json();
          setQuiz(data.results);
        };
        triviaRequest();
      } else {
        const db = getDatabase();
        const startRef = ref(db, "rooms/" + roomKey + "/start");
        onValue(startRef, (snapshot) => {
          const startData = snapshot.val();
          console.log(startData);
          if (startData) {
            dispatch(uiActions.startQuiz());
          }
        });
      }
    }
    isInitial = false;
  }, [isAdmin, roomKey, dispatch]);

  const startQuizHandler = () => {
    if (isAdmin) {
      dispatch(uiActions.startQuiz());
      writeStartQuizData(roomKey, true);
    }
  };

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardContent>
          {isAdmin ? (
            <Typography> When Ready, Click Start!</Typography>
          ) : (
            <Typography>Wait for Admin to Start the Quiz</Typography>
          )}
          <CardActions>
            {isAdmin && <Button onClick={startQuizHandler}>Start Quiz</Button>}
          </CardActions>
          <Box className={classes.box}>
            <Players />
            {quizShow ? (
              <Quiz quiz={quiz} />
            ) : (
              <div>Not Everyone is Ready!</div>
            )}
          </Box>
        </CardContent>
      </Card>
      <Card className={classes.card}>{podiumShow && <Score />}</Card>

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
