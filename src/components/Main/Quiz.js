import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { getDatabase, ref, onValue } from "firebase/database";
import { changeQuizQuestion, writeStartQuizData } from "../../util/Firebase";
import Timer from "./Timer";
import classes from "./Quiz.module.css";

const Quiz = (props) => {
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);
  const currentQuestion = useSelector((state) => state.ui.currentQuestion);
  const dispatch = useDispatch();

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
        // dispatch(uiActions.openPodiumComponent());
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
        return data.question;
      }
    });
  }, [roomKey, dispatch]);

  return (
    <section className={classes.box}>
      <div className={classes.question}>{currentQuestion.question + "?"}</div>
      <Timer />
      <div className={classes.answers}>
        {[currentQuestion.incorrect_answers].map((answer, index) => (
          <button key={index}> {answer}</button>
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
