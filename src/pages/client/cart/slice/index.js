import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiConstants from '../../../../api/apiConstants';
import api from '../../../../api';
import { message } from 'antd';

export const postCartProducts = createAsyncThunk('cart/postCartProducts', async (payload) => {
  const res = await api.post(`${apiConstants.BILL}`, payload);
  return res.data.data;
});

const initialState = {
  carts: {}
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCartProducts.fulfilled, (state, action) => {})
      .addCase(postCartProducts.rejected, (state, action) => {});
  }
});

export default cartSlice.reducer;
