import React, { useEffect, useState } from 'react'
import SearchBar from '../common/SearchBar'
import { getAllUsers } from '../../../apis/Auth'
import { useSelector } from 'react-redux'
import { getAverageRating } from '../../../utility/AverageRating'

export default function Users() {
  const [users, setUsers] = useState([])
  const { token } = useSelector(state => state.auth)
  console.log(users);

  const setUsersData = (data) => {
    setUsers(data);
  }

  return (
    <div className='flex flex-col gap-4'>
      <SearchBar setData={setUsersData} userType="admin"/>
      {/* Table */}
      <div className='w-full max-h-[50%] mx-auto '>
        <div className="w-full h-2/3 flex flex-col ">
          {users?.length !== 0 && (
            <table className="mx-auto my-0.5 w-[95%] max-w-4xl border-collapse text-center">
              <thead className="bg-blue-600 text-white font-poppins text-sm font-semibold">
                <tr>
                  <th className="py-2.5 w-11">S.No</th>
                  <th className="py-2.5 w-28">Name</th>
                  <th className="py-2.5 w-24">Address</th>
                  <th className="py-2.5 w-24">Email</th>
                  <th className="py-2.5 w-20">Role</th>
                  <th className="py-2.5 w-24">Rating</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr className="even:bg-blue-200" key={user._id}>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{index + 1}</td>
                    <td className="py-2 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-black font-poppins text-sm font-semibold">{user.name}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{user.address}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{user.email}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{user.role}</td>
                    <td className="py-2 flex gap-2.5 justify-center">{user.store ? (user.store.ratings.length === 0 ? user.store.rating : getAverageRating(user.store.ratings)) : "Not Specified"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
