import React from 'react';
import {
  ClipboardListIcon,
  LogoutIcon,
  PencilAltIcon,
  UserGroupIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import useSideNav from '../../hooks/useSideNav';
import useAuth from '../../hooks/useAuth';
import UserServices from '../../services/userServices';

function SideNav() {
  const { setIndex, index } = useSideNav();
  const { auth, setAuth } = useAuth();
  return (
    <nav className="bg-gray-900 justify-between flex flex-col w-56 px-5">
      <div className="mt-7">
        <a href="/">
          <h1 className="text-gray-300 w-fit mx-auto font-bold">ACCESS ADMIN</h1>
        </a>
        <div className="mt-8">
          <ul>
            <li className="mb-8">
              <button type="button" onClick={() => { setIndex(0); }}>
                <span
                  className={index === 0
                    ? 'text-access-primary flex flex-row items-center gap-3'
                    : 'text-gray-300 flex flex-row items-center gap-3 hover:text-access-primary'}
                >
                  <PlayIcon className="w-5" />
                  <h2 className="text-sm">Start Olimpiade</h2>
                </span>
              </button>
            </li>
            <li className="mb-8">
              <button type="button" onClick={() => { setIndex(1); }}>
                <span
                  className={index === 1
                    ? 'text-access-primary flex flex-row items-center gap-3'
                    : 'text-gray-300 flex flex-row items-center gap-3 hover:text-access-primary'}
                >
                  <ClipboardListIcon className="w-5" />
                  <h2 className="text-sm">Ranking</h2>
                </span>
              </button>
            </li>
            <li className="mb-8">
              <button type="button" onClick={() => { setIndex(2); }}>
                <span
                  className={index === 2
                    ? 'text-access-primary flex flex-row items-center gap-3'
                    : 'text-gray-300 flex flex-row items-center gap-3 hover:text-access-primary'}
                >
                  <UserGroupIcon className="w-5" />
                  <h2 className="text-sm">Peserta</h2>
                </span>
              </button>
            </li>
            <li className="mb-8 hidden">
              <button type="button" onClick={() => { setIndex(3); }}>
                <span
                  className={index === 3
                    ? 'text-access-primary flex flex-row items-center gap-3'
                    : 'text-gray-300 flex flex-row items-center gap-3 hover:text-access-primary'}
                >
                  <PencilAltIcon className="w-5" />
                  <h2 className="text-sm">Soal</h2>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4">
        <button
          type="button"
          onClick={() => {
            const id = auth.id || sessionStorage.id;
            const role = auth.roles || sessionStorage.roles;
            UserServices.logout(role, id, setAuth);
          }}
        >
          <span className="flex flex-row items-center gap-3 text-gray-300 hover:text-red-700">
            <LogoutIcon className="w-5" />
            <h2 className="text-sm">Logout</h2>
          </span>
        </button>
      </div>
    </nav>
  );
}

export default SideNav;
