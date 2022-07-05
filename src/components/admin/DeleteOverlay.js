import React, { useContext } from 'react';
import { TrashIcon, XIcon } from '@heroicons/react/outline';
import SelectedUserContext from '../../context/admin/SelectedUserProvider';
import RedButton from './RedButton';
import BlueButton from './BlueButton';
import userServices from '../../services/userServices';
import useOverlay from '../../hooks/useOverlay';

function DeleteOverlay() {
  const { overlay, setOverlay } = useOverlay();
  const selectedUser = useContext(SelectedUserContext);
  return (
    <div
      className={overlay === 'delete' ? 'h-full w-full fixed z-10 inset-0 flex justify-center items-center bg-black bg-opacity-30' : 'hidden'}
    >
      <div className="bg-white rounded-md p-5 flex flex-col z-50">
        <h1 className="mb-5">
          Anda yakin akan menghapus
          {' '}
          <span className="font-bold">{selectedUser.name}</span>
        </h1>
        <div className="flex flex-row gap-2 justify-end">
          <RedButton
            content={(
              <div className="flex flex-row gap-2">
                <TrashIcon className="w-4" />
                Hapus
              </div>
            )}
            onClick={() => {
              userServices.deleteUser(selectedUser.id);
              setOverlay('false');
              selectedUser.id = null;
              selectedUser.name = null;
            }}
          />
          <BlueButton
            content={(
              <div className="flex flex-row gap-2">
                <XIcon className="w-4" />
                batal
              </div>
            )}
            onClick={() => {
              setOverlay('false');
              selectedUser.id = null;
              selectedUser.name = null;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteOverlay;
