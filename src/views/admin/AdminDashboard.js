import React, { useState } from 'react';
import SideNav from '../../components/admin/SideNav';
import SideNavContext from '../../context/admin/SideNavProvider';
import Users from './Users';
import Ranking from './Ranking';
import Question from './Question';

function AdminDashboard() {
  const [render, setRender] = useState(<Ranking />);
  return (
    <div className="flex flex-row h-full">
      <SideNav />
      <div className="text-gray-700 bg-gray-200 h-screen w-screen">
        <SideNavContext.Consumer>
          {(value) => {
            if (value.index === 0) setRender(<Ranking />);
            if (value.index === 1) setRender(<Users />);
            if (value.index === 2) setRender(<Question />);
            return render;
          }}
        </SideNavContext.Consumer>
      </div>
    </div>
  );
}

export default AdminDashboard;
