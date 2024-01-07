import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const getDashboard = createAsyncThunk('dashboard/getDashboard', async (payload) => {
  const res = await api.get(apiConstants.DASHBOARD, { params: payload });
  return res.data;
});

export const editDashboard = createAsyncThunk('dashboard/editDashboard', async (payload) => {
  try {
    const res = await api.post(apiConstants.DASHBOARD, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  data: [],
  loading: false
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editDashboard.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      });
  }
});

export default dashboardSlice.reducer;
