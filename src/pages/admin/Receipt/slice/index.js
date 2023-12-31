import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const createReceipt = createAsyncThunk('receipt/createReceipt', async (payload) => {
  try {
    const res = await api.post(apiConstants.RECEIPT, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getReceipt = createAsyncThunk('receipt/getReceipt', async () => {
  const res = await api.get(apiConstants.RECEIPT);
  return res.data;
});

export const getReceiptById = createAsyncThunk('receipt/getReceiptById', async (payload) => {
  const res = await api.get(`${apiConstants.RECEIPT}/${payload}`);
  return res.data.data;
});

export const editReceipt = createAsyncThunk('receipt/editReceipt', async (payload) => {
  const res = await api.patch(`${apiConstants.RECEIPT}/${payload.id}`, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
});

export const deleteReceipt = createAsyncThunk('receipt/deleteReceipt', async (payload) => {
  const res = await api.delete(`${apiConstants.RECEIPT}/${payload}`);
  return res.data;
});

const initialState = {
  list: []
};

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    SET_RECEIPTS: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReceipt.fulfilled, (state, action) => {
        message.success('Thêm mới thành công');
      })
      .addCase(createReceipt.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getReceipt.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(editReceipt.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      })
      .addCase(deleteReceipt.fulfilled, (state, action) => {
        message.success('Xóa thành công');
      });
  }
});

export const { SET_RECEIPTS } = receiptSlice.actions;

export default receiptSlice.reducer;
