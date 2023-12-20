import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiConstants from '../../../../api/apiConstants';
import api from '../../../../api';

export const getProduct = createAsyncThunk('homepage/getProduct', async (payload) => {
  const res = await api.get(`${apiConstants.PRODUCT}?${payload ? payload.query : ''}`);
  return res.data;
});

const initialState = {
  list: [],
  total: 0
};

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.total = action.payload.total;
    });
  }
});

// export const {} = homepageSlice.actions;

export default homepageSlice.reducer;
