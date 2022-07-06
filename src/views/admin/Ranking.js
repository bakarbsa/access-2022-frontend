import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import useSideNav from '../../hooks/useSideNav';
import UserServices from '../../services/userServices';

function Ranking() {
  const { index } = useSideNav();
  const [users, setUsers] = useState([]);
  const getUsers = () => UserServices.getUsers(setUsers);

  useEffect(() => {
    if (users.length <= 0) {
      getUsers();
    }
  }, [users]);

  return (
    <div className={index === 1 ? 'flex flex-col h-full px-16 py-4' : 'hidden'}>
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
                    <th>Universitas</th>
                    <th>Username</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-access-primary h-14">
                      <th className="font-normal">{user.name}</th>
                      <th className="font-normal">{user.university}</th>
                      <th className="font-normal">{user.username}</th>
                      <th className="font-normal">{user.score}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
        : <Loading />}
    </div>
  );
}

export default Ranking;
