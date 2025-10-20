import { NavLink } from 'react-router';
import ThemeSwitch from '../../../components/ThemeSwitch';
import PakJetLogo from '../PakJetLogo/PakJetLogo';

const NavBar = () => {
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl py-4 px-8 mt-5 mb-9">
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
          {/* </a> */}
        </div>
      </div>
    </>
  );
};
export default NavBar;
