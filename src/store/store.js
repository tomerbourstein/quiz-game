import { configureStore } from "@reduxjs/toolkit";
import databaseSlice from "./database-slice";

const store = configureStore({
  reducer: { database: databaseSlice.reducer },
});

export default store;
