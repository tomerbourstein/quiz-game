// import { databaseActions } from "../store/database-slice";
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffleArray(array) {
  if (array === null) {
    return;
  }
  return array.sort(() => 0.5 - Math.random());
}
