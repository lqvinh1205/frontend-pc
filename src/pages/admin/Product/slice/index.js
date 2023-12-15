import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const createProduct = createAsyncThunk('product/createProduct', async (payload) => {
  try {
    const res = await api.post(apiConstants.PRODUCT, payload, {
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

export const getProduct = createAsyncThunk('product/getProduct', async () => {
  const res = await api.get(apiConstants.PRODUCT);
  return res.data;
});

export const getProductById = createAsyncThunk('product/getProductById', async (payload) => {
  const res = await api.get(`${apiConstants.PRODUCT}/${payload}`);
  return res.data.data;
});

export const editProduct = createAsyncThunk('product/editProduct', async (payload) => {
  const res = await api.patch(`${apiConstants.PRODUCT}/${payload.id}`, payload, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (payload) => {
  const res = await api.delete(`${apiConstants.PRODUCT}/${payload}`);
  return res.data;
});

const initialState = {
  list: []
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    SET_PRODUCTS: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        message.success('Thêm mới thành công');
      })
      .addCase(createProduct.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        message.success('Xóa thành công');
      });
  }
});

export const { SET_PRODUCTS } = productSlice.actions;

export default productSlice.reducer;
