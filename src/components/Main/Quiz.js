import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeQuizQuestion } from "../../util/Firebase";
// import axios from "axios";
import Timer from "./Timer";
import classes from "./Quiz.module.css";

// const api = axios.create({ baseURL: "https://opentdb.com/api.php?amount=10" });

const createData = (
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correctAnswer
) => {
  return { question, answer1, answer2, answer3, answer4, correctAnswer };
};
const questions = [
  createData(
    "What Netflix show had the most streaming views in 2021",
    "The Witcher",
    "Queen's Gambit",
    "Squid Game",
    "Modern Family",
    "Squid Game"
  ),
];
let isInitial = true;
const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const roomKey = useSelector((state) => state.database.roomKey);
  const isAdmin = useSelector((state) => state.database.isAdmin);

  useEffect(() => {
    if (isInitial) {
      if (isAdmin) {
        const triviaRequest = async () => {
          const response = await fetch("https://opentdb.com/api.php?amount=10");
          const data = await response.json();
          setQuiz(data.results);
        };
        triviaRequest();
      }
    }
    isInitial = false;
  }, [isAdmin]);

  useEffect(() => {
    const currentQuestionHandler = () => {
      var interval = 5000; // how much time should the delay between two iterations be (in milliseconds)?
      var promise = Promise.resolve();
      console.log(quiz);

      quiz.forEach(function (el) {
        promise = promise.then(function () {
          console.log(el);
          setCurrentQuestion(el);
          return new Promise(function (resolve) {
            setTimeout(resolve, interval);
          });
        });
      });
      promise.then(function () {
        console.log("Loop finished.");
      });
    };

    // function forEachWithDelay(array, callback, delay) {
    //   let i = 0;
    //   let interval = setInterval(() => {
    //     callback(array[i], i, array);
    //     if (++i === array.length) clearInterval(interval);
    //   }, delay);
    // }

    // const items = ["abc", "def", "ghi", "jkl"];

    if (isAdmin) {
      // forEachWithDelay(quiz, (item, i) => console.log(`#${i}: ${item}`), 1000);
      currentQuestionHandler();
      // changeQuizQuestion(questions, roomKey);
    }
  }, [roomKey, isAdmin, quiz]);

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
