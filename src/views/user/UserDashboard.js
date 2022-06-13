import React from 'react';
import logo from '../../assets/logo.png';
import b201 from '../../assets/b201-logo.png';
import useAuth from '../../hooks/useAuth';

function UserDashboard() {
  const { auth } = useAuth();
  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen text-lg">
      <div className="w-52">
        <img src={logo} alt="logo access" />
      </div>
      <div className="text-center w-80">
        <p className="mb-10">
          Selamat datang
          {' '}
          {auth.user}
        </p>
        <p className="font-bold mb-10">Mohon tunggu panitia memulai sesi</p>
        <p className="mb-5">Kamu akan mengerjakan tahapan Siapa Pintar</p>
        <p>Mohon perhatikan waktu saat mengerjakan soal</p>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="text-sm">Powered by</p>
        <div className="w-16">
          <img src={b201} alt="logo b201" />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
