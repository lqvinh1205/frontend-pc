import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const createBrand = createAsyncThunk('brand/createBrand', async (payload) => {
  try {
    const res = await api.post(apiConstants.BRAND, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getBrand = createAsyncThunk('brand/getBrand', async () => {
  const res = await api.get(apiConstants.BRAND);
  return res.data;
});

export const getBrandById = createAsyncThunk('brand/getBrandById', async (payload) => {
  const res = await api.get(`${apiConstants.BRAND}/${payload}`);
  return res.data.data;
});

export const editBrand = createAsyncThunk('brand/editBrand', async (payload) => {
  const res = await api.patch(`${apiConstants.BRAND}/${payload.id}`, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
});

export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (payload) => {
  const res = await api.delete(`${apiConstants.BRAND}/${payload}`);
  return res.data;
});

const initialState = {
  list: []
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    SET_BRANDS: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.fulfilled, (state, action) => {
        message.success('Thêm mới thành công');
      })
      .addCase(createBrand.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(editBrand.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        message.success('Xóa nhật thành công');
      });
  }
});

export const { SET_BRANDS } = brandSlice.actions;

export default brandSlice.reducer;
