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
  // useEffect(() => {
  //   if (!olimTime.startTime) {
  //     getTime();
  //   }
  // }, [olimTime.startTime, olimTime.endTime]);

  // setInterval(() => {
  //   setCurrentTime(Date.now());
  // }, 1000);

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
    <div>
      <NavBar />
      <OlimRoom />
    </div>
  );
}

export default UserDashboard;
