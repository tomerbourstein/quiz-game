import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomKey: "",
  isAdmin: false,
  players: [],
  triviaData: [],
};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    savePlayers(state, action) {
      let playersList = [];
      for (const user in action.payload) {
        playersList.push(action.payload[user]);
      }
      state.players = playersList;
    },
    saveRoomKey(state, action) {
      state.roomKey = action.payload;
    },
    setAdmin(state) {
      state.isAdmin = true;
    },
    saveTriviaData(state, action) {
      state.triviaData = action.payload;
    },
  },
});

export const databaseActions = databaseSlice.actions;

export default databaseSlice;
