import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
export default PrivateRoute;
