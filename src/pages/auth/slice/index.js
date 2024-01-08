import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import apiConstants from '../../../api/apiConstants';
import api from '../../../api';

export const loginAuth = createAsyncThunk('auth/loginAuth', async (payload) => {
  try {
    const res = await api.post(`${apiConstants.AUTH}/login`, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const registerAuth = createAsyncThunk('auth/registerAuth', async (payload) => {
  try {
    const res = await api.post(`${apiConstants.AUTH}/register`, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  list: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.fulfilled, (state, action) => {
        message.success('Đăng nhập thành công');
      })
      .addCase(loginAuth.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(registerAuth.fulfilled, (state, action) => {
        message.success('Đăng ký thành công');
      })
      .addCase(registerAuth.rejected, (state, action) => {
        message.error(action.error.message);
      });
  }
});

export const { SET_BRANDS } = authSlice.actions;

export default authSlice.reducer;
