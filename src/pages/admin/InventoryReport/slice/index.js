import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api';
import apiConstants from '../../../../api/apiConstants';

export const getInventory = createAsyncThunk('inventory/getInventory', async () => {
  const res = await api.get(apiConstants.INVENTORY);
  return res.data;
});

const initialState = {
  list: [],
  total: 0
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    SET_INVENTORYS: (state, payload) => {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getInventory.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.total = action.payload.total;
    });
  }
});

export const { SET_INVENTORYS } = inventorySlice.actions;

export default inventorySlice.reducer;
