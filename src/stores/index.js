import { configureStore } from '@reduxjs/toolkit';
import homepageReduce from '../pages/client/homepage/slice';
import brandReduce from '../pages/admin/Brand/slice';
import userReduce from '../pages/admin/User/slice';
import productReduce from '../pages/admin/Product/slice';
import billReduce from '../pages/admin/Bill/slice';
import detailProductReduce from '../pages/client/detailProduct/slice';
import configuageReduce from '../pages/admin/Configuage/slice';
import receiptReduce from '../pages/admin/Receipt/slice';
import inventoryReduce from '../pages/admin/InventoryReport/slice';
import dashboardReduce from '../pages/admin/Dashboard/slice';
import appSlice from './app.slice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    homepage: homepageReduce,
    brand: brandReduce,
    user: userReduce,
    product: productReduce,
    detailProduct: detailProductReduce,
    configuage: configuageReduce,
    bill: billReduce,
    receipt: receiptReduce,
    inventory: inventoryReduce,
    dashboard: dashboardReduce
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
