import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Timer from "./Timer";
import classes from "./Quiz.module.css";
import { getTrivia } from "../../util/index";

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
const Quiz = () => {
  const getPlayers = useSelector((state) => state.database.players);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(getPlayers);
  }, [getPlayers]);

  
  useEffect(() => {
    dispatch(getTrivia());
  }, [dispatch]);

  return (
    <section className={classes.box}>
      <div className={classes.question}>
        {questions.map((data) => data.question + "?")}
      </div>
      <Timer />
      <div className={classes.answers}>
        <button> {questions.map((data) => data.answer1)} </button>
        <button> {questions.map((data) => data.answer2)} </button>
        <button> {questions.map((data) => data.answer3)} </button>
        <button> {questions.map((data) => data.answer4)} </button>
      </div>

      <div className={classes.correctAnswer}>
        <span> {questions.map((data) => data.correctAnswer)}</span>
      </div>
    </section>
  );
};

export default Quiz;
