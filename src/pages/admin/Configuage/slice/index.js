import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const getConfiguage = createAsyncThunk('brand/getConfiguage', async () => {
  const res = await api.get(apiConstants.CONFIGUAGE);
  return res.data;
});

export const editConfiguage = createAsyncThunk('brand/editConfiguage', async (payload) => {
  try {
    const res = await api.post(apiConstants.CONFIGUAGE, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  list: []
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    SET_CONFIGUAGES: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfiguage.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(editConfiguage.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      });
  }
});

export const { SET_CONFIGUAGES } = brandSlice.actions;

export default brandSlice.reducer;
