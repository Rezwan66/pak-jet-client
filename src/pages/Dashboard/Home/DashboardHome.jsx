import useAuth from '../../../hooks/useAuth';

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <>
      <div>
        <h2> HELLO I Am DashboardHome </h2>
        <p>Here we will add some basic dashboard options like user info</p>
        {user && <span>UserName: {user?.displayName || 'Login Now'}</span>}
      </div>
    </>
  );
};
export default DashboardHome;
