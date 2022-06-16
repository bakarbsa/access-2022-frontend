import React from 'react';
import SideNav from '../../components/admin/SideNav';
import Users from './Users';
import Ranking from './Ranking';
import Question from './Question';
import StartOlimpiade from './StartOlimpiade';

function AdminDashboard() {
  return (
    <div className="flex flex-row h-full">
      <SideNav />
      <div className="text-gray-700 bg-gray-200 h-screen w-screen">
        <StartOlimpiade />
        <Ranking />
        <Users />
        <Question />
      </div>
    </div>
  );
}

export default AdminDashboard;
