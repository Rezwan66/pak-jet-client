import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar/NavBar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <div className="container min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default RootLayout;
