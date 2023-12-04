import HomePage from '../pages/homepage';
import ClientLayout from '../layouts/clientLayout';
import { Route, Routes } from 'react-router-dom';

// import { protectedRoutes } from "./protected";
// import { publicRoutes } from "./public";

export const AppRoutes = () => {
  //   const auth = useAuth();
  //   const routes = auth.user ? protectedRoutes : publicRoutes;
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
