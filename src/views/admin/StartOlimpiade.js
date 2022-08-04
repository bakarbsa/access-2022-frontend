import React, { useState, useEffect } from 'react';
import useSideNav from '../../hooks/useSideNav';
import OlimServices from '../../services/olimServices';
import useOverlay from '../../hooks/useOverlay';
import EditTimeOverlay from '../../components/admin/EditTimeOverlay';

function StartOlimpiade() {
  const { index } = useSideNav();
  const { setOverlay } = useOverlay();
  const [time, setTime] = useState({});
  const getTime = () => {
    OlimServices.getTime('admin', setTime);
  };
  useEffect(() => {
    if (!time.startTime) {
      getTime();
    }
  }, [time.startTime, time.endTime]);
  return (
    <div className={index === 0 ? 'flex flex-col h-full px-16 py-4 justify-center items-center' : 'hidden'}>
      <h1 className="text-2xl font-bold">Mulai Olimpiade</h1>
      <p className="mt-2 mb-5">Anda dapat mengubah waktu olimpiade.</p>
      <table className="table-fixed w-80 mb-5">
        <thead>
          <tr>
            <th>Waktu Dimulai</th>
            <th>Waktu Berakhir</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-8">
            <th className="font-normal">
              {time.startTime
                ? (new Date(time.startTime)).toDateString()
                : 'NaN'}
              <br />
              {
                time.startTime
                  ? (new Date(time.startTime)).getHours().toString().length === 1
                    ? `0${(new Date(time.startTime)).getHours().toString()}`
                    : (new Date(time.startTime)).getHours().toString()
                  : 'NaN'
              }
              {' : '}
              {
                time.startTime
                  ? (new Date(time.startTime)).getMinutes().toString().length === 1
                    ? `0${(new Date(time.startTime)).getMinutes().toString()}`
                    : (new Date(time.startTime)).getMinutes().toString()
                  : 'NaN'
              }
              {' : '}
              {
                time.startTime
                  ? (new Date(time.startTime)).getSeconds().toString().length === 1
                    ? `0${(new Date(time.startTime)).getSeconds().toString()}`
                    : (new Date(time.startTime)).getSeconds().toString()
                  : 'NaN'
              }
            </th>
            <th className="font-normal">
              {time.startTime ? (new Date(time.endTime)).toDateString() : 'NaN'}
              <br />
              {time.startTime
                ? (new Date(time.endTime)).getHours().toString().length === 1
                  ? `0${(new Date(time.endTime)).getHours().toString()}`
                  : (new Date(time.endTime)).getHours().toString()
                : 'NaN'}
              {' : '}
              {time.startTime
                ? (new Date(time.endTime)).getMinutes().toString().length === 1
                  ? `0${(new Date(time.endTime)).getMinutes().toString()}`
                  : (new Date(time.endTime)).getMinutes().toString()
                : 'NaN'}
              {' : '}
              {time.startTime
                ? (new Date(time.endTime)).getSeconds().toString().length === 1
                  ? `0${(new Date(time.endTime)).getSeconds().toString()}`
                  : (new Date(time.endTime)).getSeconds().toString()
                : 'NaN'}
            </th>
          </tr>
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => {
          setOverlay('time');
        }}
      >
        <div
          className="w-24 py-1 bg-access-green rounded-md text-white"
        >
          Edit waktu
        </div>
      </button>
      <div className="relative z-10">
        {time.startTime && time.endTime ? <EditTimeOverlay defaultStartTime={time.startTime} defaultEndTime={time.endTime} /> : <div />}
      </div>
    </div>
  );
}

export default StartOlimpiade;
