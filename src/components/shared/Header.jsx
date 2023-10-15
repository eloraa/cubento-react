import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../providers/authProviders';
import { toast } from 'react-toastify';

export const Header = ({ className }) => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast('Signed out successfully.'))
      .catch(() => toast('An error occurred. Please try again later'));
  };

  const location = useLocation();
  return (
    <header className={`py-6 md:px-10 px-5 flex items-center text-sm gap-10 max-md:flex-wrap ${className}`}>
      <Link to="/">
        <h1 className="text-red font-bold uppercase text-base">Cubento</h1>
      </Link>
      {((location.pathname === '/signin' && location.pathname === '/signup') || user) && (
        <ul className="flex gap-6 max-md:order-1 max-md:w-full justify-between">
          {!location.pathname.includes('/event') && (
            <li>
              <NavLink to="/book" className={({ isActive }) => (isActive ? 'border-b border-black' : '')}>
                Book an Appointment
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/booked" className={({ isActive }) => (isActive ? 'border-b border-black' : '')}>
              Booked Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved" className={({ isActive }) => (isActive ? 'border-b border-black' : '')}>
              Saved Event
            </NavLink>
          </li>
        </ul>
      )}
      {user ? (
        <div className="flex-1 justify-end items-center flex gap-4">
          <div className="flex gap-2 items-center">
            <Link to="/profile" className="w-8 h-8 overflow-hidden rounded-full bg-[#ddd]">
              <img className="w-full h-full object-cover" src={user.photoURL ? user.photoURL : '/pfp-placeholder.png'} alt="" />
            </Link>
            <h2 className="text-ellipsis whitespace-nowrap leading-3">{user?.displayName ? user.displayName : user.email}</h2>
          </div>
          <div className="w-3 border-b border-black rounded"></div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="flex-1 text-right">
          {location.pathname === '/signin' ? (
            <Link state={location?.state} to="/signup">
              Sign Up
            </Link>
          ) : (
            <Link state={location?.state} to="/signin">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
