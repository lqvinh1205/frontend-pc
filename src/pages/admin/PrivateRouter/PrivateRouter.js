import { Navigate } from 'react-router-dom';

const PrivateRouter = (props) => {
  const user = localStorage.getItem('user');
  if (user) {
    const role = JSON.parse(user).user?.role;
    if (role == 1 || role == 2) {
      return props.children;
    }
  } else {
    return <Navigate to="/signin" />;
  }
  return <Navigate to="/" />;
};

export default PrivateRouter;
