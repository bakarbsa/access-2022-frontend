/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import useOverlay from '../../hooks/useOverlay';
import UserServices from '../../services/userServices';
import Loading from '../Loading';

function UserDetailOverlay(props) {
  const { id } = props;
  const { overlay, setOverlay } = useOverlay();
  const [user, setUser] = useState({});
  const arrayCounter = [1, 11, 21, 31, 41, 51, 61, 71, 81, 91];

  const getUser = () => {
    UserServices.getUser(id, setUser, 'admins/users');
  };
  useEffect(() => {
    if (!user.id && id) {
      getUser();
    }
  }, [user.id]);

  const indexToAlfa = (index) => {
    if (index === 1) return 'A';
    if (index === 2) return 'B';
    if (index === 3) return 'C';
    if (index === 4) return 'D';
    if (index === 5) return 'E';
    return '';
  };
  return (
    <div className={overlay === 'detail' ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}>
      {user.id
        ? (
          <div className="bg-white rounded-md px-10 py-7 flex flex-col z-50">
            <p className="text-2xl font-bold">{user.name}</p>
            <div className="flex flex-row gap-10 mt-5">
              {[...Array(10)].map((e1, i) => (
                <ul key={i}>
                  {[...Array(10)].map((e2, j) => (
                    <li className="mb-4" key={j}>{`${j + arrayCounter[i]}. ${indexToAlfa(user.currentAnswer[`${j + arrayCounter[i]}`]) || ''}`}</li>
                  ))}
                </ul>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-access-red text-white text-sm px-8 py-2 rounded-md"
                onClick={() => {
                  setOverlay('');
                  window.location.reload();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )
        : <Loading />}
    </div>
  );
}

export default UserDetailOverlay;
