import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import UserServices from '../../services/userServices';
import DeleteButton from '../../components/admin/DeleteButton';
import EditButton from '../../components/admin/EditButton';
import EditOverlay from '../../components/admin/EditOverlay';

function Users() {
  const users = UserServices.getUsers();
  const [editedUser, setEditedUser] = useState();
  const [overlay, setOverlay] = useState(false);
  return (
    <div className="h-full relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex flex-col h-full px-16 py-4 ">
        <h1 className="text-2xl font-bold">Daftar Peserta</h1>
        <div className="flex flex-row justify-between items-center mt-2 mb-5">
          <p>Anda dapat melihat daftar peserta, menambahkan, dan menghapusnya.</p>
          <button
            type="submit"
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
                    <EditButton
                      content={(
                        <div className="flex flex-row gap-2">
                          <PencilIcon className="w-4" />
                          Edit
                        </div>
                      )}
                      onClick={() => { setEditedUser(user.id); setOverlay(true); }}
                    />
                    <span className="mx-1" />
                    <DeleteButton
                      content={(
                        <div className="flex flex-row gap-2">
                          <TrashIcon className="w-4" />
                          Hapus
                        </div>
                      )}
                      id={user.id}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="relative z-10">
        <EditOverlay id={editedUser} show={overlay} />
      </div>
    </div>
  );
}

export default Users;
