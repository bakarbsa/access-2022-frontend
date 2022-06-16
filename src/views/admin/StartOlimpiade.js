import React from 'react';
import useSideNav from '../../hooks/useSideNav';
import OlimServices from '../../services/olimServices';
import useAuth from '../../hooks/useAuth';

function StartOlimpiade() {
  const { index } = useSideNav();
  const { auth } = useAuth();
  const isStart = OlimServices.getStartState();
  return (
    <div className={index === 0 ? 'flex flex-col h-full px-16 py-4 justify-center items-center' : 'hidden'}>
      <h1 className="text-2xl font-bold">Mulai Olimpiade</h1>
      <p className="mt-2 mb-5">Anda dapat menekan tombol start untuk memulai olimpiade.</p>
      <button
        type="button"
        onClick={() => {
          OlimServices.updateStartState(auth.accessToken);
          console.log(isStart);
        }}
      >
        <div
          className={isStart ? 'w-24 py-1 bg-red-600 rounded-md text-white' : 'w-24 py-1 bg-access-green rounded-md text-white'}
        >
          {isStart ? 'Pause' : 'Start'}
        </div>
      </button>
    </div>
  );
}

export default StartOlimpiade;
