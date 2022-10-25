import { createSlice } from "@reduxjs/toolkit";

const initialState = {roomKey: "", players: [], nicknames: []};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    savePlayers (state, action) {
        let playersList = []
        let nicknamesList = []
        for (const user in action.payload) {
            playersList.push(action.payload[user])
            nicknamesList.push(action.payload[user].nickname);
        }
        state.players = playersList
        state.nicknames = nicknamesList;
    },
    saveRoomKey (state, action) {
        state.roomKey = action.payload;
    }
  },
});

export const databaseActions = databaseSlice.actions;

export default databaseSlice;
