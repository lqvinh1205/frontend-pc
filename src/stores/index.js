import { configureStore } from '@reduxjs/toolkit';
import homepageReduce from '../pages/client/homepage/slice';
import brandReduce from '../pages/admin/Brand/slice';
import userReduce from '../pages/admin/User/slice';
import appSlice from './app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    homepage: homepageReduce,
    brand: brandReduce,
    user: userReduce
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
