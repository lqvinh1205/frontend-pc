import { configureStore } from '@reduxjs/toolkit';
import homepageReduce from '../pages/client/homepage/slice';
import brandReduce from '../pages/admin/Brand/slice';
import appSlice from './app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    homepage: homepageReduce,
    brand: brandReduce
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
