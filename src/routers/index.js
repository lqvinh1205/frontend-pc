import LandingPage from "../features/landing";
import { useRoutes } from "react-router-dom";

// import { protectedRoutes } from "./protected";
// import { publicRoutes } from "./public";

export const AppRoutes = () => {
  //   const auth = useAuth();

  const commonRoutes = [
    {
      path: "/",
      element: <LandingPage />,
    },
  ];

  //   const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
