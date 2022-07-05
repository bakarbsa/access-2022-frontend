import React, { useContext, useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import UserServices from '../../services/userServices';
import EditOverlay from '../../components/admin/EditOverlay';
import AddOverlay from '../../components/admin/AddOverlay';
import SelectedUserProvider from '../../context/admin/SelectedUserProvider';
import DeleteOverlay from '../../components/admin/DeleteOverlay';
import BlueButton from '../../components/admin/BlueButton';
import RedButton from '../../components/admin/RedButton';
import useSideNav from '../../hooks/useSideNav';
import useOverlay from '../../hooks/useOverlay';
import Loading from '../../components/Loading';

function Users() {
  const { index } = useSideNav();
  const { setOverlay } = useOverlay();
  const [users, setUsers] = useState([]);
  const selectedUser = useContext(SelectedUserProvider);

  const getUsers = () => UserServices.getUsers(setUsers);

  useEffect(() => {
    if (users.length <= 0) {
      getUsers();
    }
  }, [users]);

  return (
    <div className={index === 2 ? 'h-full relative z-10' : 'hidden'} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {users.length > 0
        ? (
          <div className="h-full">
            <div className="flex flex-col h-full px-16 py-4 ">
              <h1 className="text-2xl font-bold">Daftar Peserta</h1>
              <div className="flex flex-row justify-between items-center mt-2 mb-5">
                <p>Anda dapat melihat daftar peserta, menambahkan, dan menghapusnya.</p>
                <button
                  type="submit"
                  onClick={() => { setOverlay('add'); }}
                  className="bg-access-green text-access-white font-semibold rounded-md px-4 py-1"
                >
                  <p className="text-sm font-medium">Tambah Peserta</p>
                </button>
              </div>
              <div className="h-full overflow-y-scroll">
                <table className="table-fixed w-full">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Universitas</th>
                      <th>Username</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-access-primary h-14">
                        <th className="font-normal">{user.name}</th>
                        <th className="font-normal">{user.university}</th>
                        <th className="font-normal">{user.username}</th>
                        <th>
                          <BlueButton
                            content={(
                              <div className="flex flex-row gap-2">
                                <PencilIcon className="w-4" />
                                Edit
                              </div>
                          )}
                            onClick={() => {
                              selectedUser.id = user.id;
                              setOverlay('edit');
                            }}
                          />
                          <span className="mx-1" />
                          <RedButton
                            content={(
                              <div className="flex flex-row gap-2">
                                <TrashIcon className="w-4" />
                                Hapus
                              </div>
                          )}
                            onClick={() => {
                              selectedUser.id = user.id;
                              selectedUser.name = user.name;
                              setOverlay('delete');
                            }}
                          />
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="relative z-10">
              {selectedUser.id
                ? <EditOverlay />
                : <div className="hidden">loading...</div>}
              <AddOverlay />
              {selectedUser.id && selectedUser.name
                ? <DeleteOverlay />
                : <div className="hidden">loading...</div>}
            </div>
          </div>
        )
        : <Loading />}
    </div>
  );
}

export default Users;
