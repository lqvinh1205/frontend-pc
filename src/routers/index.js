import HomePage from '../pages/client/homepage';
import ClientLayout from '../layouts/ClientLayout';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard/Dashboard';
import ListBrand from '../pages/admin/Brand/ListBrand';
import AddBrand from '../pages/admin/Brand/AddBrand';
import EditBrand from '../pages/admin/Brand/EditBrand';
import ListUsers from '../pages/admin/User/ListUsers';
import AddUser from '../pages/admin/User/AddUser';
import EditUser from '../pages/admin/User/EditUser';
import ListProducts from '../pages/admin/Product/ListProducts';
import AddProduct from '../pages/admin/Product/AddProduct';
import EditProduct from '../pages/admin/Product/EditProduct';
import SettingConfiguage from '../pages/admin/Configuage/SettingConfiguage';
import DetailProduct from '../pages/client/detailProduct';
import Cart from '../pages/client/cart';
import ListBills from '../pages/admin/Bill/ListBill';

// import { protectedRoutes } from "./protected";
// import { publicRoutes } from "./public";

export const AppRoutes = () => {
  //   const auth = useAuth();
  //   const routes = auth.user ? protectedRoutes : publicRoutes;
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<DetailProduct />} />
        <Route path="carts" element={<Cart />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="brand">
          <Route index element={<ListBrand />} />
          <Route path="add" element={<AddBrand />} />
          <Route path=":id/edit" element={<EditBrand />} />
        </Route>
        <Route path="users">
          <Route index element={<ListUsers />} />
          <Route path="add" element={<AddUser />} />
          <Route path=":id/edit" element={<EditUser />} />
        </Route>
        <Route path="products">
          <Route index element={<ListProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id/edit" element={<EditProduct />} />
        </Route>
        <Route path="configuage">
          <Route index element={<SettingConfiguage />} />
        </Route>
        <Route path="bills">
          <Route index element={<ListBills />} />
        </Route>
      </Route>
    </Routes>
  );
};
