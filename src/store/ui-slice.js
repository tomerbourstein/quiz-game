import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenWidth: null,
  homepageShow: true,
  welcomeDialogShow: true,
  createRoomDialogShow: false,
  enterRoomDialogShow: false,
  isLoading: false,
  mainShow: false,
  quizShow: false,
  podiumShow: false,
  currentQuestion: "",
  questionNumber: -2,
  correctAnswerShow: false,
  allAnswersShow: true,
  startAnimation: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScreenWidth(state, action) {
      state.screenWidth = action.payload;
    },
    createRoom(state) {
      state.createRoomDialogShow = true;
      state.enterRoomDialogShow = false;
    },
    enterRoom(state) {
      state.createRoomDialogShow = false;
      state.enterRoomDialogShow = true;
    },
    isLoading(state, action) {
      state.createRoomDialogShow = false;
      state.enterRoomDialogShow = false;
      state.homepageShow = false;
      state.isLoading = action.payload;
    },
    openQuizComponent(state) {
      state.isLoading = false;
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
      if (state.questionNumber > 10) {
        state.questionNumber = 0;
      } else {
        state.questionNumber++;
      }
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
    isShowAnswer(state, action) {
      state.correctAnswerShow = action.payload;
    },
    showAllAnswers(state, action) {
      state.allAnswersShow = action.payload;
    },
    playAnimation(state) {
      state.startAnimation = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
