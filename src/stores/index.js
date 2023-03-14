import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers.js";

export const store = configureStore({
  reducer,
});
