// import { databaseActions } from "../store/database-slice";

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

