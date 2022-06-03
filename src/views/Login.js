import React, { useState } from 'react';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/outline';
import Button from '../components/Button';
import bg from '../assets/login-bg-web.jpg';
import decor from '../assets/login-decor.png';
import logo from '../assets/logo.png';
import b201 from '../assets/b201-logo.png';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  return (
    <div>
      <div className="w-screen h-screen overflow-hidden absolute">
        <img src={bg} className="h-full w-full" alt="access background" />
      </div>
      <div className="w-full h-screen">
        <div className="fixed flex justify-between h-full w-full z-10">
          <img src={decor} className="h-full md:block hidden" alt="login-decor" />
          <div className="xl:w-1/3 lg:w-2/4 md:w-3/6 w-full md:rounded-tl-4xl px-14 pt-10 flex flex-col justify-between items-center bg-access-white">
            <img src={logo} alt="access logo" />
            <div className="w-full flex flex-col gap-6 items-center">
              <h2 className="text-xl text-access-dark font-bold">Silahkan login</h2>
              <form method="post" className="w-full flex flex-col gap-10 mb-5">
                <div className="flex gap-4">
                  <UserCircleIcon className="w-10 text-access-dark" />
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pb-1 border-b-2 border-access-dark focus:outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <LockClosedIcon className="w-10 text-access-dark" />
                  <input
                    type="text"
                    placeholder="Password"
                    value={formData.password}
                    name={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pb-1 border-b-2 border-access-dark focus:outline-none"
                  />
                </div>
              </form>
              <Button content="Masuk" />
            </div>
            <div>
              <h1>Powered by</h1>
              <img src={b201} alt="b201 logo" className="w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
