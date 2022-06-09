import React, { useState, useContext } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import OverlayContext from '../../context/admin/OverlayProvider';
import RedButton from './RedButton';
import BlueButton from './BlueButton';
import userServices from '../../services/userServices';
import useAuth from '../../hooks/useAuth';

function AddOverlay() {
  const { auth } = useAuth();
  const overlayContext = useContext(OverlayContext);
  const [user, setUser] = useState({
    name: '',
    university: '',
    username: '',
    password: '',
  });
  return (
    <div
      className={overlayContext.addOverlay ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}
    >
      <div className="bg-white rounded-md p-5 flex flex-col z-50">
        <form action="submit" method="put">
          <table className="table-auto text-left">
            <tbody>
              <tr className="h-10">
                <th>Name</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>University</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                    name="university"
                    value={user.university}
                    onChange={(e) => setUser({ ...user, university: e.target.value })}
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>Username</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                </th>
              </tr>
              <tr className="h-10">
                <th>Password</th>
                <th>
                  <input
                    className="ml-2 pb-1 border-black focus:outline-none"
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </form>
        <div className="flex flex-row gap-2 justify-end">
          <BlueButton
            content={(
              <div className="flex flex-row gap-2">
                <PlusIcon className="w-4" />
                Tambahkan
              </div>
            )}
            onClick={() => {
              if (user.name && user.password && user.university && user.username) {
                userServices.addUser(auth.accessToken, user);
                overlayContext.addOverlay = false;
                setUser({
                  name: '',
                  university: '',
                  username: '',
                  password: '',
                });
              } else {
                console.log('Form cannot be empty');
              }
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
              overlayContext.addOverlay = false;
              setUser({
                name: '',
                university: '',
                username: '',
                password: '',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddOverlay;
