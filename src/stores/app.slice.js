import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import i18n from "../config/i18n";

const initialState = {
  language: "vn",
  text: "welcome",
};

export const changeLanguage = createAsyncThunk(
  "app/changeLanguage",
  async (language) => {
    try {
      await i18n.changeLanguage(language);
      localStorage.setItem("i18n", language);
      console.log("you updated language to: " + language);
    } catch (error) {}
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeText: (state) => {
      state.text = "text change";
    },
    testFn() {
      console.log("context reducer");
    },
  },
});

export const { changeText } = appSlice.actions;
export default appSlice.reducer;
