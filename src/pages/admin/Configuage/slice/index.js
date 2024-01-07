import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const getConfiguage = createAsyncThunk('config/getConfiguage', async () => {
  const res = await api.get(apiConstants.CONFIGUAGE);
  return res.data;
});

export const editConfiguage = createAsyncThunk('config/editConfiguage', async (payload) => {
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

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
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

export default configSlice.reducer;
