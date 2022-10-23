import { createSlice } from "@reduxjs/toolkit";

const initialState = {roomKey: "", players: "", nicknames: []};

const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    savePlayers (state, action) {
        state.players = action.payload;
        let nicknamesList = []
        for (const user in action.payload) {
            nicknamesList.push(action.payload[user].nickname);
        }
        state.nicknames = nicknamesList;
    },
    saveRoomKey (state, action) {
        state.roomKey = action.payload;
    }
  },
});

export const databaseActions = databaseSlice.actions;

export default databaseSlice;
