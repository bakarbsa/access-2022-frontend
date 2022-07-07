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

  const timeFormat = (hours, minutes) => {
    let formatHours = hours;
    let formatMinutes = minutes;

    if (hours.length === 1) {
      formatHours = `0${formatHours}`;
    }
    if (minutes.length === 1) {
      formatMinutes = `0${formatMinutes}`;
    }

    return `${formatHours}:${formatMinutes}`;
  };

  return (
    olimTime.startTime
      ? (currentTime >= olimTime.startTime && currentTime <= olimTime.endTime)
        ? (
          <div>
            <NavBar userName={auth.user} />
            <OlimRoom />
          </div>
        )
        : (
          <div>
            <NavBar />
            <div className="flex flex-col justify-between gap-10 mx-28 pt-5 text-lg">
              <div className="text-start">
                <div className="mt-24" />
                <p className="text-2xl font-bold mb-5">
                  Selamat datang,
                  {' '}
                  {auth.name}
                </p>
                <p className="mb-1">
                  Tahapan Preliminary Round akan dilaksanakan pada
                </p>
                <div className="mb-5">
                  <p>
                    Mulai :
                    {` ${new Date(olimTime.startTime).toDateString()}`}
                    {` , Pukul ${timeFormat(
                      new Date(olimTime.startTime).getHours().toString(),
                      new Date(olimTime.startTime).getMinutes().toString(),
                    )}`}
                  </p>
                  <p>
                    Selesai :
                    {` ${new Date(olimTime.endTime).toDateString()}`}
                    {` , Pukul ${timeFormat(
                      new Date(olimTime.endTime).getHours().toString(),
                      new Date(olimTime.endTime).getMinutes().toString(),
                    )}`}
                  </p>
                </div>
                <p>Mohon perhatikan beberapa hal berikut ini:</p>
                <ol className="list-decimal list-inside">
                  <li>
                    Gunakan
                    {' '}
                    <span className="font-bold">laptop atau PC</span>
                    {' '}
                    (website tidak berjalan dengan baik di perangkat mobile)
                  </li>
                  <li>Refresh halaman ini jika saat waktu mulai anda tidak memasuki halaman pengerjaan soal</li>
                  <li>
                    Maksimal akun yang dapat login adalah
                    {' '}
                    <span className="font-bold">3 orang</span>
                    {' '}
                    , mohon
                    {' '}
                    <span className="font-bold">logout</span>
                    {' '}
                    akun jika ingin berganti perangkat
                  </li>
                </ol>
              </div>
              <div className="flex flex-col mt-10">
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
