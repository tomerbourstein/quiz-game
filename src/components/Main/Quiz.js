import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { changeQuizQuestion } from "../../util/Firebase";
import Timer from "./Timer";
import classes from "./Quiz.module.css";

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentQuestionHandler = () => {
      var interval = 6000; // how much time should the delay between two iterations (in milliseconds)?
      var promise = Promise.resolve();
      console.log(props.quiz);

      props.quiz.forEach(function (el) {
        promise = promise.then(function () {
          console.log(el);
          setCurrentQuestion(el);
          changeQuizQuestion(el, roomKey);
          return new Promise(function (resolve) {
            setTimeout(resolve, interval);
          });
        });
      });
      promise.then(function () {
        console.log("Loop finished.");
        setCurrentQuestion("");
        changeQuizQuestion(null, roomKey);

        dispatch(uiActions.openPodiumComponent());
      });
    };

    if (isAdmin) {
      currentQuestionHandler();
    }
  }, [roomKey, isAdmin, props.quiz, dispatch]);

  return (
    <section className={classes.box}>
      <div className={classes.question}>{currentQuestion.question + "?"}</div>
      <Timer />
      <div className={classes.answers}>
        {[currentQuestion.incorrect_answers].map((answer) => (
          <button> {answer}</button>
        ))}
        <button>{currentQuestion.correct_answer}</button>
        {/* <button> {questions.map((data) => data.answer1)} </button>
        <button> {questions.map((data) => data.answer2)} </button>
        <button> {questions.map((data) => data.answer3)} </button>
        <button> {questions.map((data) => data.answer4)} </button> */}
      </div>

      <div className={classes.correctAnswer}>
        <span> {currentQuestion.correct_answer}</span>
      </div>
    </section>
  );
};

export default Quiz;
