import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import OnlineStatus from '../../components/admin/OnineStatus';
import useSideNav from '../../hooks/useSideNav';
import UserServices from '../../services/userServices';
import OfflineStatus from '../../components/admin/OfflineStatus';
import useOverlay from '../../hooks/useOverlay';
import UserDetailOverlay from '../../components/admin/UserDetailOverlay';

function Ranking() {
  const { index } = useSideNav();
  const { overlay, setOverlay } = useOverlay();
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const getUsers = () => UserServices.getUsers(setUsers);

  useEffect(() => {
    if (users.length <= 0) {
      UserServices.updateScore();
      getUsers();
    }
  }, [users]);

  return (
    <div className={index === 1 ? 'flex flex-col px-16 py-4' : 'hidden'}>
      {users.length >= 0
        ? (
          <div className="h-full">
            <h1 className="text-2xl font-bold mb-2">Ranking Peserta</h1>
            <p className="mb-5">Anda dapat melihat melihat peringkat peserta berdasarkan score yang didapat.</p>
            <div className="h-full overflow-y-scroll">
              <table className="table-fixed w-full">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Status</th>
                    <th>Universitas</th>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-access-primary h-14">
                      <th className="font-normal">{user.name}</th>
                      <th className="font-normal">
                        <div>
                          {
                            !user.login && user.login <= 0
                              ? <OfflineStatus />
                              : <OnlineStatus onlineUsers={user.login} />
                          }
                          <div className="my-1" />
                          <div className="flex justify-center">
                            <div className={`${user.isDone ? 'bg-access-green ' : 'bg-access-red '} w-[105px] py-1 rounded-md text-white text-sm`}>
                              {user.isDone ? 'Sudah submit' : 'Belum submit'}
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="font-normal">{user.university}</th>
                      <th className="font-normal">{user.username}</th>
                      <th className="font-normal">{user.score}</th>
                      <th>
                        <button
                          type="button"
                          className="bg-access-blue-100 rounded-md px-3 py-1 text-sm text-white"
                          onClick={() => {
                            setOverlay('detail');
                            setSelectedId(user.id);
                          }}
                        >
                          Details
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={overlay === 'detail' ? 'relative z-10' : 'hidden'}>
              {selectedId === '' || !selectedId
                ? <Loading />
                : <UserDetailOverlay id={selectedId} />}
            </div>
          </div>
        )
        : <Loading />}
    </div>
  );
}

export default Ranking;
