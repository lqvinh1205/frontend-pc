import { configureStore } from '@reduxjs/toolkit';
import homepageReduce from '../pages/client/homepage/slice';
import brandReduce from '../pages/admin/Brand/slice';
import userReduce from '../pages/admin/User/slice';
import productReduce from '../pages/admin/Product/slice';
import detailProductReduce from '../pages/client/detailProduct/slice';
import configuageReduce from '../pages/admin/Configuage/slice';
import appSlice from './app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    homepage: homepageReduce,
    brand: brandReduce,
    user: userReduce,
    product: productReduce,
    detailProduct: detailProductReduce,
    configuage: configuageReduce
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
