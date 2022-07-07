import React, { useEffect, useState } from 'react';
import OlimServices from '../../services/olimServices';

function Time() {
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
    <div className="flex flex-col items-center mb-4 justify-center ">
      <h1 className="text-lg font-bold">Waktu Tersisa</h1>
      <div className="flex flex-row gap-5 pt-3">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg">{ olimTime.endTime ? getHours(currentTime, olimTime.endTime) : '00'}</h1>
          <h1 className="text-lg">Jam</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg">{ olimTime.endTime ? getMinutes(currentTime, olimTime.endTime) : '00'}</h1>
          <h1 className="text-lg">Menit</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg">{ olimTime.endTime ? getSeconds(currentTime, olimTime.endTime) : '00'}</h1>
          <h1 className="text-lg">Detik</h1>
        </div>
      </div>
    </div>
  );
}

export default Time;
