import { configureStore } from '@reduxjs/toolkit';
import homepageSlice from '../pages/client/homepage/slice';
import appSlice from './app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    homepage: homepageSlice
  }
});
