import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  changeQuizQuestion,
  writeStartQuizData,
  updateUserScore,
} from "../../util/Firebase";
import { shuffleArray, timePassedInSeconds } from "../../util/index";
import Timer from "./Timer";
import Typography from "@mui/material/Typography";
import classes from "./Quiz.module.css";

const Quiz = (props) => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const questionNumber = useSelector((state) => state.ui.questionNumber);
  const correctAnswerShow = useSelector((state) => state.ui.correctAnswerShow);
  const allAnswersShow = useSelector((state) => state.ui.allAnswersShow);
  const dispatch = useDispatch();

  const [playerScore, setPlayerScore] = useState(0);
  const [questionScore, setQuestionScore] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [strikeCounter, setStrikeCounter] = useState(1);

  const triviaAnswers =
    currentQuestion.question === undefined
      ? null
      : currentQuestion.incorrect_answers.concat(
          currentQuestion.correct_answer
        );
  const shuffledTriviaAnswers = shuffleArray(triviaAnswers);
  const { quiz } = props;

  let startTime = Date.now();

  useEffect(() => {
    const currentQuestionHandler = () => {
      const isStart = false;
      const removeQuestion = null;
      let interval = 18000; // how much time should the delay between two iterations (in milliseconds)?
      let promise = Promise.resolve();
      quiz.forEach(function (el) {
        promise = promise.then(function () {
          changeQuizQuestion(el, roomKey);
          return new Promise(function (resolve) {
            setTimeout(resolve, interval);
          });
        });
      });
      promise.then(function () {
        console.log("Loop finished.");
        changeQuizQuestion(removeQuestion, roomKey);
        writeStartQuizData(roomKey, isStart);
      });
    };

    if (isAdmin) {
      currentQuestionHandler();
    }
  }, [roomKey, isAdmin, quiz, dispatch]);

  useEffect(() => {
    const db = getDatabase();
    const quizRef = ref(db, "rooms/" + roomKey + "/quiz");
    let data;
    return onValue(quizRef, (snapshot) => {
      data = snapshot.val();
      if (data) {
        dispatch(uiActions.showAllAnswers(true));
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
    updateUserScore(playerScore, roomKey);
    // eslint-disable-next-line
  }, [playerScore, roomKey]);

  const userChosenAnswerHandler = (chosenValue) => {
    const MAX_TIME = 15;
    const timeLeftInSeconds = () =>
      MAX_TIME - Math.floor(timePassedInSeconds(startTime));
    const timeBonus = timeLeftInSeconds() * 100;
    dispatch(uiActions.showAllAnswers(false));
    if (currentQuestion.correct_answer === chosenValue) {
      setIsAnswerCorrect(true);
      if (isAnswerCorrect) {
        setStrikeCounter((prevStrike) => {
          const newStrike = prevStrike + 1;
          return newStrike;
        });
      }
      const scoreWithStrikeAndTimeBonus = 1000 * strikeCounter + timeBonus;
      setQuestionScore(scoreWithStrikeAndTimeBonus);
      setPlayerScore((prevState) => {
        const newState = prevState + scoreWithStrikeAndTimeBonus;
        return newState;
      });
      console.log("You got it right, here are 1000 points");
    } else {
      setIsAnswerCorrect(false);
      setStrikeCounter(1);
      console.log("You got it WRONG!!!!");
    }
  };

  return (
    <section className={classes.box}>
      <Typography>{questionNumber}</Typography>
      <Typography>
        {questionScore +
          (strikeCounter === 1 ? null : " " + strikeCounter + "X")}
      </Typography>

      <div className={classes.question}>{currentQuestion.question}</div>
      <Timer />
      {allAnswersShow && (
        <div className={classes.answers}>
          {shuffledTriviaAnswers !== undefined
            ? shuffledTriviaAnswers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => userChosenAnswerHandler(answer)}
                >
                  {answer}
                </button>
              ))
            : null}
        </div>
      )}
      <div className={classes.correctAnswer}>
        {correctAnswerShow && <span> {currentQuestion.correct_answer}</span>}
      </div>
    </section>
  );
};

export default Quiz;
