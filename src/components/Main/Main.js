import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  writeStartQuizData,
  exitGameRoomFirebase,
  updateUserScore,
  changeQuizQuestion,
} from "../../util/Firebase";
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
          if (startData) {
            dispatch(uiActions.startQuiz());
          }
          if (!startData) {
            const newScore = 0;
            updateUserScore(newScore, roomKey);
          }
        });
      }
    }
    isInitial = false;
  }, [isAdmin, roomKey, dispatch]);

  const startQuizHandler = () => {
    if (isAdmin) {
      const isStart = true;
      dispatch(uiActions.startQuiz());
      writeStartQuizData(roomKey, isStart);
    }
  };

  const exitGameRoomHandler = () => {
    isInitial = true;
    exitGameRoomFirebase(roomKey);
    dispatch(uiActions.exitGameRoom());
  };

  const restartQuizHandler = () => {
    // update score to zero.
    const newScore = 0;
    const isStart = false;
    const resetQuestion = null;
    changeQuizQuestion(resetQuestion, roomKey);
    updateUserScore(newScore, roomKey);
    writeStartQuizData(roomKey, isStart);
    // set state in main component;
    dispatch(uiActions.restartQuiz());
    if (isAdmin) {
      // if admin fetch new questions.
    }
  };
  return (
    <Fragment className={classes.Main}>
      <Card className={classes.card}>
        <CardContent>
          {isAdmin && !quizShow && (
            <Typography> When Ready, Click Start!</Typography>
          )}

          {!isAdmin && !quizShow && (
            <Typography>Wait for Admin to Start the Quiz</Typography>
          )}

          <CardActions>
            {isAdmin && !quizShow && (
              <Button onClick={startQuizHandler}>Start Quiz</Button>
            )}
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
          {isAdmin && (
            <Button onClick={restartQuizHandler}> Restart Quiz </Button>
          )}
          <Button onClick={exitGameRoomHandler}> Exit Game Room </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default Main;
