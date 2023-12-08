import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';

const initialState = {};

export const createImage = createAsyncThunk('images/createImage', async (payload) => {
  try {
    api.post('v1/images/single', payload);
  } catch (error) {}
});

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    changeText: (state) => {
      state.text = 'text change';
    },
    testFn() {
      console.log('context reducer');
    }
  }
});

export const { changeText } = imageSlice.actions;
export default imageSlice.reducer;
