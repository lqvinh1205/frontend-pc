import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiConstants from '../../../../api/apiConstants';
import api from '../../../../api';

export const getProductById = createAsyncThunk('detailProduct/getProductById', async (payload) => {
  const res = await api.get(`${apiConstants.PRODUCT}/${payload}`);
  return res.data.data;
});

const initialState = {
  product: {}
};

export const detailProductSlice = createSlice({
  name: 'detailProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  }
});

// export const {} = detailProductSlice.actions;

export default detailProductSlice.reducer;
