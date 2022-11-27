import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homepageShow: true,
  welcomeDialogShow: true,
  createRoomDialogShow: false,
  enterRoomDialogShow: false,
  mainShow: false,
  quizShow: false,
  podiumShow: false,
  currentQuestion: "",
  questionNumber: -2,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    createRoom(state) {
      state.createRoomDialogShow = true;
      state.enterRoomDialogShow = false;
    },
    enterRoom(state) {
      state.createRoomDialogShow = false;
      state.enterRoomDialogShow = true;
    },
    openQuizComponent(state) {
      state.createRoomDialogShow = false;
      state.enterRoomDialogShow = false;
      state.homepageShow = false;
      state.mainShow = true;
    },
    startQuiz(state) {
      state.quizShow = true;
      state.podiumShow = false;
    },
    openPodiumComponent(state) {
      state.podiumShow = true;
      state.quizShow = false;
    },
    setCurrentQuestion(state, action) {
      state.currentQuestion = action.payload;
    },
    setQuestionNumber(state) {
      state.questionNumber++;
    },
    exitGameRoom(state) {
      state.mainShow = false;
      state.homepageShow = true;
      state.startQuiz = false;
      state.podiumShow = false;
      state.currentQuestion = "";
      state.questionNumber = -2;
    },
    restartQuiz(state) {
      state.quizShow = false;
      state.podiumShow = false;
      state.currentQuestion = "";
      state.questionNumber = -2;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
