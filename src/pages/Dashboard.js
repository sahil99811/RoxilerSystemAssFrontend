import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/dashboard/SideBar'
export default function DashBoard() {
  return (
    <div>
      <div className='flex w-[100vw] h-[100vh]'>
      <SideBar></SideBar>
      <div className='w-[83%]'>
                {/* Render the nested routes components */}
                <Outlet />
      </div>
      
       
    </div>
    </div>
  )
}
