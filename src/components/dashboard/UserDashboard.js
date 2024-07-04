import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from './common/SearchBar';
import { getAverageRating } from '../../utility/AverageRating';
import { getUserRating } from '../../utility/MyRating';
import toast from 'react-hot-toast';
import {getAllStores} from '../../apis/Store'
import {createRating,updateRating} from '../../apis/Rating'
export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const { user } = useSelector((state) => state.profile);
   const {token}=useSelector((state)=>state.auth);
  const [editRatingPopup, setEditRatingPopup] = useState(false);
  const [addRatingPopup, setAddRatingPopup] = useState(false);
  const [rating, setRating] = useState('');
  const [storeId, setStoreId] = useState('');

  const setStoresData = (data) => {
    setStores(data);
  };
  const fetchStores=async()=>{
    const result=await getAllStores({},token)
    if(result){
      setStoresData(result);
    }
  }
  const addRatingHandler =async () => {
    if (!rating) {
      toast.error('Rating is required');
      return;
    }
    if (rating < 0 || rating > 5) {
      toast.error('Rating should be 0 to 5');
      return;
    }
    // Handle adding rating logic here
    const result=await createRating(rating,storeId,token);
    if(result)
     {
      setAddRatingPopup(false);
      setStoreId('');
      setRating('');
      fetchStores()
     }
  };

  const editRatingHandler =async () => {
    if (!rating) {
      toast.error('Rating is required');
      return;
    }
    if (rating < 0 || rating > 5) {
      toast.error('Rating should be 0 to 5');
      return;
    }
    // Handle editing rating logic here
    const result=await updateRating(rating,storeId,token)
    if(result){
      setEditRatingPopup(false);
      setStoreId('');
      setRating('');
      fetchStores();
    }
  };
  
  return (
    <div className='flex flex-col gap-3'>
      <SearchBar setData={setStoresData} userType="user" />
      <div className='w-[100%] mx-auto'>
        <div className="w-full h-2/3 flex flex-col overflow-y-scroll overflow-x-hidden">
          {stores?.length !== 0 && (
            <table className="mx-auto my-0.5 w-[95%] max-w-4xl overflow-y-scroll overflow-x-hidden border-collapse text-center">
              <thead className="bg-blue-600 text-white font-poppins text-sm font-semibold">
                <tr>
                  <th className="py-2.5 w-11">S.No</th>
                  <th className="py-2.5 w-28">Name</th>
                  <th className="py-2.5 w-24">Address</th>
                  <th className="py-2.5 w-24">Average Rating</th>
                  <th className="py-2.5 w-20">My Submitted Rating</th>
                </tr>
              </thead>
              <tbody>
                {stores?.map((store, index) => (
                  <tr className="even:bg-blue-200" key={store._id}>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{index + 1}</td>
                    <td className="py-2 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-black font-poppins text-sm font-semibold">{store.name}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{store.address}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">
                      {getAverageRating(store.ratings) || store.rating}
                    </td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">
                      {getUserRating(user._id, store.ratings) !== -1 ? (
                        <div className='flex'>
                          {getUserRating(user._id, store.ratings)}
                          <button className='text-white bg-red-500 px-1 rounded-md ml-2' onClick={() => { setStoreId(store._id); setEditRatingPopup(true); }}>Edit Rating</button>
                        </div>
                      ) : (
                        <button className='text-white bg-red-500 px-1 rounded-md' onClick={() => { setStoreId(store._id); setAddRatingPopup(true); }}>Add Rating</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {editRatingPopup && (
        <div className='fixed w-[250px] h-[160px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none rounded-lg z-20 flex flex-col gap-5 shadow-xl'>
          <span className='text-center mt-2'>Enter A Rating</span>
          <input
            type='number'
            className='w-[90%] border-2 border-gray-300 rounded-md mx-auto text-base px-1 py-1 text-gray-700 outline-none'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min={0}
            max={5}
          />
          <div className='flex gap-3'>
            <button className='w-[40%] mx-auto text-white bg-red-500 px-1 py-1 rounded-md' onClick={() => { setRating(''); setStoreId(''); setEditRatingPopup(false); }}>Cancel</button>
            <button className='w-[40%] mx-auto text-white bg-red-500 px-1 py-1 rounded-md' onClick={editRatingHandler}>Edit Rating</button>
          </div>
        </div>
      )}
      {addRatingPopup && (
        <div className='fixed w-[250px] h-[160px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none rounded-lg z-20 flex flex-col gap-5 shadow-xl'>
          <span className='text-center mt-2'>Enter A Rating</span>
          <input
            type='number'
            className='w-[90%] border-2 border-gray-300 rounded-md mx-auto text-base px-1 py-1 text-gray-700 outline-none'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min={0}
            max={5}
          />
          <div className='flex gap-3'>
            <button className='w-[40%] mx-auto text-white bg-red-500 px-1 py-1 rounded-md' onClick={() => { setRating(''); setStoreId(''); setAddRatingPopup(false); }}>Cancel</button>
            <button className='w-[40%] mx-auto text-white bg-red-500 px-1 py-1 rounded-md' onClick={addRatingHandler}>Add Rating</button>
          </div>
        </div>
      )}
    </div>
  );
}
