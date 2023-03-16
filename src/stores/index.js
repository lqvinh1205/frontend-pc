import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "../features/landing/landingSlice";
import appSlice from "./app.slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    landing: landingSlice,
  },
});
