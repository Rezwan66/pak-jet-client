import { Outlet } from 'react-router';
import NavBar from '../pages/shared/NavBar/NavBar';
import Footer from '../pages/shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="py-8 max-w-7xl mx-auto">
      <NavBar />
      <div className=" min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default RootLayout;
