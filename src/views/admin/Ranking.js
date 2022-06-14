import React from 'react';
import useSideNav from '../../hooks/useSideNav';
import UserServices from '../../services/userServices';

function Ranking() {
  const { index } = useSideNav();
  const users = UserServices.getUsers(true);
  return (
    <div className={index === 0 ? 'flex flex-col h-full px-16 py-4' : 'hidden'}>
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
  );
}

export default Ranking;
