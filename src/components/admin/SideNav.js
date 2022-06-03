import React from 'react';
import {
  ClipboardListIcon, LogoutIcon, PencilAltIcon, UserGroupIcon,
} from '@heroicons/react/outline';

function SideNav() {
  return (
    <nav className="bg-gray-900 justify-between flex flex-col w-56 px-5">
      <div className="mt-7">
        <a href="/">
          <h1 className="text-gray-300 w-fit mx-auto font-bold">ACCESS ADMIN</h1>
        </a>
        <div className="mt-8">
          <ul>
            <li className="mb-8">
              <a href="/">
                <span className="flex flex-row items-center gap-3 text-gray-300 hover:text-access-primary">
                  <ClipboardListIcon className="w-5" />
                  <h2 className="text-sm">Ranking</h2>
                </span>
              </a>
            </li>
            <li className="mb-8">
              <a href="/">
                <span className="flex flex-row items-center gap-3 text-gray-300 hover:text-access-primary">
                  <UserGroupIcon className="w-5" />
                  <h2 className="text-sm">Peserta</h2>
                </span>
              </a>
            </li>
            <li className="mb-8">
              <a href="/">
                <span className="flex flex-row items-center gap-3 text-gray-300 hover:text-access-primary">
                  <PencilAltIcon className="w-5" />
                  <h2 className="text-sm">Soal</h2>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <a href="/">
          <span className="flex flex-row items-center gap-3 text-gray-300 hover:text-red-700">
            <LogoutIcon className="w-5" />
            <h2 className="text-sm">Logout</h2>
          </span>
        </a>
      </div>
    </nav>
  );
}

export default SideNav;
