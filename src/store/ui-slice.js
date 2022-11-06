import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homepageShow: true,
  welcomeDialogShow: true,
  createRoomDialogShow: false,
  enterRoomDialogShow: false,
  mainShow: false,
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
    startQuiz(state) {
      state.createRoomDialogShow = false;
      state.enterRoomDialogShow = false;
      state.homepageShow = false;
      state.mainShow = true;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
