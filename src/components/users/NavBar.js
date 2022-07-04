import React from 'react';
import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.png';
import RedButton from '../admin/RedButton';

function NavBar() {
  return (
    <nav className="absolute px-12 h-24 w-screen bg-white flex justify-between items-center">
      <img src={Logo} alt="access logo" className="w-48 " />
      <div className="flex">
        <div className="flex justify-between items-center">
          <h1>UserName</h1>
          <img src={Avatar} alt="avatar" className="h-12 ml-4" />
        </div>
        <div className="ml-12">
          <RedButton
            content={(
              <div className="px-2 py-1"><h2 className="text-xl font-bold">Log Out</h2></div>
            )}
            onClick={() => {
              console.log('sada');
            }}
          />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;