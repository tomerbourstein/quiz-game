import { databaseActions } from "../store/database-slice";

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTrivia(triviaData) {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      if (!response.ok) {
        throw new Error("Could not fetch data.");
      }
      const data = await response.json();
      return data;
    };
    try {
      const triviaData = await fetchData();
      console.log(triviaData.results);
      dispatch(databaseActions.saveTriviaData(triviaData));
    } catch (error) {
      console.log(error.message);
    }
  };
}
