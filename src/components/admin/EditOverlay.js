import axios from 'axios';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { PencilIcon, XIcon } from '@heroicons/react/outline';
import SelectedUserContext from '../../context/admin/SelectedUserProvider';
import RedButton from './RedButton';
import BlueButton from './BlueButton';
import API_URL from '../../api';
import userServices from '../../services/userServices';
import useOverlay from '../../hooks/useOverlay';
import Loading from '../Loading';

function EditOverlay() {
  const { overlay, setOverlay } = useOverlay();
  const selectedUser = useContext(SelectedUserContext);
  const [user, setUser] = useState();
  const [pass, setPass] = useState();

  const getUser = useCallback(async () => {
    await axios.get(`${API_URL}/admins/users/${selectedUser.id}`)
      .then((res) => {
        setPass(res.data.data.password);
        setUser({
          name: res.data.data.name,
          university: res.data.data.university,
          username: res.data.data.username,
          password: '',
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <div
      className={overlay === 'edit' ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}
    >
      {user
        ? (
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
                    <PencilIcon className="w-4" />
                    Edit
                  </div>
                )}
                onClick={() => {
                  userServices.updateUser(
                    selectedUser.id,
                    {
                      name: user.name,
                      username: user.username,
                      university: user.university,
                      password: user.password ? user.password : pass,
                    },
                  );
                  setOverlay('false');
                  selectedUser.id = null;
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
                  selectedUser.id = null;
                }}
              />
            </div>
          </div>
        )
        : <Loading />}
    </div>
  );
}

export default EditOverlay;
