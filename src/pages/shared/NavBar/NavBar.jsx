import { Link, NavLink } from 'react-router';
import ThemeSwitch from '../../../components/ThemeSwitch';
import PakJetLogo from '../PakJetLogo/PakJetLogo';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
  const { user, loading, logOut } = useAuth();
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );
  // console.log(user?.displayName);

  const handleLogout = () => {
    logOut()
      .then(res => {
        console.log(res?.user);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm rounded-2xl py-4 px-8 mt-0 mb-9">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl"> */}
          <PakJetLogo />
          {/* </a> */}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {/* <a className="btn"> */}
          <ThemeSwitch />
          {loading ? (
            <span></span>
          ) : user ? (
            <div className="flex items-center justify-center gap-1">
              <button className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold">
                {user?.displayName
                  ?.split(/\s+/)
                  .filter(Boolean)
                  .map(n => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </button>
              <button onClick={handleLogout} className="btn">
                SignOut
              </button>
            </div>
          ) : (
            <button className="btn">
              <Link to="/login">Sign In</Link>
            </button>
          )}

          {/* </a> */}
        </div>
      </div>
    </>
  );
};
export default NavBar;
