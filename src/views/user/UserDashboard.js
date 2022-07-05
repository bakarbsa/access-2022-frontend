/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import b201 from '../../assets/b201-logo.png';
import useAuth from '../../hooks/useAuth';
import OlimServices from '../../services/olimServices';
import NavBar from '../../components/users/NavBar';
import OlimRoom from '../../components/users/OlimRoom';
import Loading from '../../components/Loading';

function UserDashboard() {
  const { auth } = useAuth();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [olimTime, setOlimTime] = useState({});

  const getTime = () => {
    OlimServices.getTime('user', setOlimTime);
    console.log(olimTime);
  };
  useEffect(() => {
    if (!olimTime.startTime) {
      getTime();
    }
  }, [olimTime.startTime, olimTime.endTime]);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
  }, []);

  const getHours = (current, end) => {
    const hours = Math.floor((end - current) / 1000 / 60 / 60);
    if (hours.toString().length === 1) {
      return `0${hours}`;
    }
    return hours;
  };

  const getMinutes = (current, end) => {
    const difTime = (end - current) - getHours(current, end) * 1000 * 60 * 60;
    const minutes = Math.floor(difTime / 1000 / 60);
    if (minutes.toString().length === 1) {
      return `0${minutes}`;
    }
    return minutes;
  };

  const getSeconds = (current, end) => {
    const difTime = (end - current) - getHours(current, end) * 1000 * 60 * 60 - getMinutes(current, end) * 1000 * 60;
    const seconds = Math.floor(difTime / 1000);
    if (seconds.toString().length === 1) {
      return `0${seconds}`;
    }
    return seconds;
  };
  return (
    olimTime.startTime
      ? (currentTime >= olimTime.startTime && currentTime <= olimTime.endTime)
        ? (
          <div>
            <h1>
              { olimTime.endTime ? getHours(currentTime, olimTime.endTime) : '00'}
              {' : '}
              { olimTime.endTime ? getMinutes(currentTime, olimTime.endTime) : '00'}
              {' : '}
              { olimTime.endTime ? getSeconds(currentTime, olimTime.endTime) : '00'}
            </h1>
            <NavBar />
            <OlimRoom />
          </div>
        )
        : (
          <div>
            <NavBar />
            <div className="flex flex-col gap-10 justify-center items-center h-screen w-screen text-lg">
              <div className="text-center w-80">
                <div className="mt-24" />
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
          </div>
        )
      : <Loading />
  );
}

export default UserDashboard;
