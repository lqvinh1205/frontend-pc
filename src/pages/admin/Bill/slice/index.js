import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const createBill = createAsyncThunk('bill/createBill', async (payload) => {
  try {
    const res = await api.post(apiConstants.BILL, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getBill = createAsyncThunk('bill/getBill', async () => {
  const res = await api.get(apiConstants.BILL);
  return res.data;
});

export const getBillById = createAsyncThunk('bill/getBillById', async (payload) => {
  const res = await api.get(`${apiConstants.BILL}/${payload}`);
  return res.data.data;
});

export const editBill = createAsyncThunk('bill/editBill', async (payload) => {
  const res = await api.patch(`${apiConstants.BILL}/${payload.id}`, payload.data);
  return res.data;
});

export const deleteBill = createAsyncThunk('bill/deleteBill', async (payload) => {
  const res = await api.delete(`${apiConstants.BILL}/${payload}`);
  return res.data;
});

const initialState = {
  list: [],
  total: 0
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBill.fulfilled, (state, action) => {
        message.success('Thêm mới thành công');
      })
      .addCase(createBill.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getBill.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(editBill.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        message.success('Xóa thành công');
      });
  }
});

export const {} = billSlice.actions;

export default billSlice.reducer;
