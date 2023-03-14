import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  language: "vn",
  text: "welcome",
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeText: (state) => {
      state.text = "text change";
    },
    changeLanguage: (state) => {
      state.language = "en";
    },
    testFn() {
      console.log("context reducer");
    },
  },
  // actions: {
  //   testFn() {
  //     console.log("context");
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(getAllCountry.fulfilled, (state, action) => {
  //     state.countries = action.payload;
  //   });
  // },
});
export const { testFn, changeLanguage, changeText } = appReducer.actions;
export default appReducer.reducer;
