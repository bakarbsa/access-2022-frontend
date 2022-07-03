import React, { useState } from 'react';
import { PencilIcon, XIcon } from '@heroicons/react/outline';
import useOverlay from '../../hooks/useOverlay';
import RedButton from './RedButton';
import BlueButton from './BlueButton';
import OlimServices from '../../services/olimServices';
import useAuth from '../../hooks/useAuth';

function EditTimeOverlay() {
  const { overlay, setOverlay } = useOverlay();
  const { auth } = useAuth();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  return (
    <div className={overlay === 'time' ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}>
      <div className="bg-white rounded-md p-5 flex flex-col z-50">
        <p className="mb-2">
          Masukan waktu dalam
          {' '}
          <span className="font-bold">epoch milliseconds,</span>
          <br />
          anda dapat melakukan konversi melalui link
          {' '}
          <a href="https://currentmillis.com/" className="underline" target="_blank" rel="noopener noreferrer">ini</a>
        </p>
        <form action="submit" method="put">
          <table className="table-auto text-left">
            <tbody>
              <tr className="h-10">
                <th>Waktu Mulai</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none text-right"
                    type="number"
                    name="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>Waktu Berakhir</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none text-right"
                    type="number"
                    name="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="flex flex-row gap-2 justify-center mt-3">
          <BlueButton
            content={(
              <div className="flex flex-row gap-2">
                <PencilIcon className="w-4" />
                Edit
              </div>
                )}
            onClick={() => {
              OlimServices.updateTime(auth.accessToken, Number(startTime), Number(endTime));
              setOverlay('false');
              setStartTime(0);
              setEndTime(0);
            }}
          />
          <RedButton
            content={(
              <div className="flex flex-row gap-2">
                <XIcon className="w-4" />
                batal
              </div>
                )}
            onClick={() => {
              setOverlay('false');
              setStartTime(0);
              setEndTime(0);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditTimeOverlay;
