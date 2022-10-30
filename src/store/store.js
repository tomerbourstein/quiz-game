import { configureStore } from "@reduxjs/toolkit";
import databaseSlice from "./database-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { database: databaseSlice.reducer, ui: uiSlice.reducer },
});

export default store;
