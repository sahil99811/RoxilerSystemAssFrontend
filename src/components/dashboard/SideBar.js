import React from 'react';
import { sidebarlink } from '../../data/Sidebar-adminlinks';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../slices/authSlice';
import {setUser} from '../../slices/profileSlice'
import { toast } from 'react-hot-toast';

export default function SideBar() {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const dispatch = useDispatch();

  const matchDashboard = (path) => {
    return path === location.pathname;
  };

  const logoutHandler = () => {
    toast.success('Logout Successful...');
    localStorage.clear();
    dispatch(setToken(null));
    dispatch(setToken(null))
  };

  return (
    <div className="w-1/6 flex flex-col gap-2 mt-2 relative">
      <div className="mb-5">
        <img
          src="https://roxiler.com/wp-content/uploads/2022/03/Logo.svg"
          className="h-14"
          alt="Logo"
        />
      </div>
       <Link key={sidebarlink[0].id} to={sidebarlink[0].path}>
            <div
              className={`flex gap-4 items-center cursor-pointer pl-5 h-9 ${
                matchDashboard(sidebarlink[0].path) ? 'bg-gray-300' : ''
              }`}
            >
              <span className="text-gray-500 font-medium text-md">Dashboard</span>
            </div>
       </Link>
      {user.role === 'admin' && (
        <>
          <Link key={sidebarlink[1].id} to={sidebarlink[1].path}>
            <div
              className={`flex gap-4 items-center cursor-pointer pl-5 h-9 ${
                matchDashboard(sidebarlink[1].path) ? 'bg-gray-300' : ''
              }`}
            >
              <span className="text-gray-500 font-medium text-md">Users</span>
            </div>
          </Link>
          <Link key={sidebarlink[2].id} to={sidebarlink[2].path}>
            <div
              className={`flex gap-4 items-center cursor-pointer pl-5 h-9 ${
                matchDashboard(sidebarlink[2].path) ? 'bg-gray-300' : ''
              }`}
            >
              <span className="text-gray-500 font-medium text-md">Add Stores</span>
            </div>
          </Link>
          <Link key={sidebarlink[3].id} to={sidebarlink[3].path}>
            <div
              className={`flex gap-4 items-center cursor-pointer pl-5 h-9 ${
                matchDashboard(sidebarlink[3].path) ? 'bg-gray-300' : ''
              }`}
            >
              <span className="text-gray-500 font-medium text-md">Add Users</span>
            </div>
          </Link>
        </>
      )}
      <Link key={sidebarlink[4].id} to={sidebarlink[4].path}>
            <div
              className={`flex gap-4 items-center cursor-pointer pl-5 h-9 ${
                matchDashboard(sidebarlink[4].path) ? 'bg-gray-300' : ''
              }`}
            >
              <span className="text-gray-500 font-medium text-md">Update Passwword</span>
            </div>
       </Link>
      <button
        className="absolute bottom-4 left-4 text-lg font-medium text-red-600"
        onClick={logoutHandler}
      >
        Log Out
      </button>
    </div>
  );
}
