import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

const initialState = {
  brands: []
};

export const createBrand = createAsyncThunk('brand/createBrand', async (payload) => {
  const res = await api.post('v1/images/single', payload);
  return res;
});

export const getBrand = createAsyncThunk('brand/getBrand', async () => {
  const res = await api.get(apiConstants.BRAND);
  return res;
});

export const getBrandById = createAsyncThunk('brand/getBrandById', async (payload) => {
  const res = await api.get(`${apiConstants.BRAND}/${payload}`);
  return res;
});

export const editBrand = createAsyncThunk('brand/editBrand', async (payload) => {
  const res = await api.patch(`${apiConstants.BRAND}/${payload.id}`, payload);
  return res;
});

export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (payload) => {
  const res = await api.delete(`${apiConstants.BRAND}/${payload}`);
  return res;
});

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    SET_BRANDS: (state, payload) => {
      state.brands = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createBrand.fulfilled, (state, payload) => {
      message.success('Thêm mới thành công');
    });
    builder.addCase(getBrand.fulfilled, (state, payload) => {
      SET_BRANDS(payload);
    });
    builder.addCase(editBrand.fulfilled, (state, payload) => {
      message.success('Cập nhật thành công');
    });
    builder.addCase(deleteBrand.fulfilled, (state, payload) => {
      message.success('Xóa nhật thành công');
    });
  }
});

export const { SET_BRANDS } = brandSlice.actions;

export default brandSlice.reducer;
