import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import { changeQuizQuestion, writeStartQuizData } from "../../util/Firebase";
import { shuffleArray, timePassedInSeconds } from "../../util/index";
import Timer from "./Timer";
import Typography from "@mui/material/Typography";
import classes from "./Quiz.module.css";

const Quiz = (props) => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const questionNumber = useSelector((state) => state.ui.questionNumber);
  const dispatch = useDispatch();

  const [playerScore, setPlayerScore] = useState(0);
  const [questionScore, setQuestionScore] = useState(0);

  const triviaAnswers =
    currentQuestion.question === undefined
      ? null
      : currentQuestion.incorrect_answers.concat(
          currentQuestion.correct_answer
        );
  const shuffledTriviaAnswers = shuffleArray(triviaAnswers);

  let startTime = Date.now();

  useEffect(() => {
    const currentQuestionHandler = () => {
      var interval = 18000; // how much time should the delay between two iterations (in milliseconds)?
      var promise = Promise.resolve();

      props.quiz.forEach(function (el) {
        promise = promise.then(function () {
          changeQuizQuestion(el, roomKey);
          return new Promise(function (resolve) {
            setTimeout(resolve, interval);
          });
        });
      });
      promise.then(function () {
        console.log("Loop finished.");
        changeQuizQuestion(null, roomKey);
        writeStartQuizData(roomKey, null);
      });
    };

    if (isAdmin) {
      currentQuestionHandler();
    }
  }, [roomKey, isAdmin, props.quiz, dispatch]);

  useEffect(() => {
    const db = getDatabase();
    const quizRef = ref(db, "rooms/" + roomKey + "/quiz");
    let data;
    return onValue(quizRef, (snapshot) => {
      data = snapshot.val();
      if (data) {
        dispatch(uiActions.setCurrentQuestion(data.question));
      } else {
        dispatch(uiActions.setCurrentQuestion(""));
        dispatch(uiActions.openPodiumComponent());
      }
    });
  }, [roomKey, dispatch]);

  useEffect(() => {
    // eslint-disable-next-line
    startTime = Date.now();
    dispatch(uiActions.setQuestionNumber());
  }, [currentQuestion, dispatch]);

  useEffect(() => {
    console.log(playerScore);
  }, [playerScore]);

  const userChoosenAnswerHandler = (value) => {
    const MAX_TIME = 15;
    const timeLeftInSeconds = () =>
      MAX_TIME - Math.floor(timePassedInSeconds(startTime));
    const timeBonus = timeLeftInSeconds() * 100;

    if (currentQuestion.correct_answer === value) {
      setQuestionScore(1000 + timeBonus);
      setPlayerScore((prevState) => {
        const newState = prevState + 1000 + timeBonus;
        return newState;
      });
      console.log("You got it right, here are 1000 points");
    } else {
      console.log("You got it WRONG!!!!");
    }
  };

  return (
    <section className={classes.box}>
      <Typography>{questionNumber}</Typography>
      <Typography>{questionScore}</Typography>

      <div className={classes.question}>{currentQuestion.question}</div>
      <Timer />
      <div className={classes.answers}>
        {shuffledTriviaAnswers !== undefined
          ? shuffledTriviaAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => userChoosenAnswerHandler(answer)}
              >
                {answer}
              </button>
            ))
          : null}
      </div>

      <div className={classes.correctAnswer}>
        <span> {currentQuestion.correct_answer}</span>
      </div>
    </section>
  );
};

export default Quiz;
