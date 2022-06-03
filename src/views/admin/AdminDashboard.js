import React from 'react';
import SideNav from '../../components/admin/SideNav';
import Users from './Users';

function AdminDashboard() {
  return (
    <div className="flex flex-row h-full">
      <SideNav />
      <div className="text-gray-700 bg-gray-200 h-screen w-screen">
        <Users />
      </div>
    </div>
  );
}

export default AdminDashboard;
