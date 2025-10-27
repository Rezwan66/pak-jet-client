import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="max-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
        <span className="loading loading-spinner loading-xl text-primary"></span>
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
export default PrivateRoute;
