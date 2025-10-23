import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import PakJetLogo from '../pages/shared/PakJetLogo/PakJetLogo';

const AuthLayout = () => {
  return (
    <>
      <div className="relative min-h-screen ">
        {/* logo fixed at very top-left */}
        <div className="absolute top-4 left-4 z-20">
          <PakJetLogo />
        </div>

        {/* stacked on small screens, two equal halves on large screens */}
        <div className="flex flex-col-reverse md:flex-row min-h-screen">
          {/* left: full width on small, half on large. Outlet centered inside left half */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
            <div className="w-full max-w-lg">
              <Outlet />
            </div>
          </div>

          {/* right: full width on small, half on large. image centered inside right half */}
          <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#FAFDF0]">
            <img
              src={authImg}
              alt="Auth illustration"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthLayout;
