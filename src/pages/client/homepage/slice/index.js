import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});

export const { increment } = homepageSlice.actions;

export default homepageSlice.reducer;
