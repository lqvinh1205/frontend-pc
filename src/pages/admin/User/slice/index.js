import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';
import { message } from 'antd';

export const createUser = createAsyncThunk('user/createUser', async (payload) => {
  try {
    const res = await api.post(apiConstants.USER, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await api.get(apiConstants.USER);
  return res.data;
});

export const getUserById = createAsyncThunk('user/getUserById', async (payload) => {
  const res = await api.get(`${apiConstants.USER}/${payload}`);
  return res.data.data;
});

export const editUser = createAsyncThunk('user/editUser', async (payload) => {
  const res = await api.patch(`${apiConstants.USER}/${payload.id}`, payload);
  return res.data;
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (payload) => {
  const res = await api.delete(`${apiConstants.USER}/${payload}`);
  return res.data;
});

const initialState = {
  list: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USERS: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        message.success('Thêm mới thành công');
      })
      .addCase(createUser.rejected, (state, action) => {
        message.error(action.error.message);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        message.success('Cập nhật thành công');
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        message.success('Xóa thành công');
      });
  }
});

export const { SET_USERS } = userSlice.actions;

export default userSlice.reducer;
