import React from 'react';
import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.png';
import RedButton from '../admin/RedButton';
import useAuth from '../../hooks/useAuth';
import UserServices from '../../services/userServices';

function NavBar() {
  const { auth, setAuth } = useAuth();
  return (
    <nav className="absolute px-12 h-24 w-full bg-white flex justify-between items-center">
      <img src={Logo} alt="access logo" className="w-36 " />
      <div className="flex">
        <div className="flex justify-between items-center">
          <h1>{auth.name}</h1>
          <img src={Avatar} alt="avatar" className="h-12 ml-4" />
        </div>
        <div className="ml-5">
          <RedButton
            content={(
              <div className="px-2 py-1"><h2 className="text-xl font-bold">Log Out</h2></div>
            )}
            onClick={() => {
              const id = auth.id || localStorage.id;
              const role = auth.roles || localStorage.roles;
              UserServices.logout(role, id, setAuth);
            }}
          />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
