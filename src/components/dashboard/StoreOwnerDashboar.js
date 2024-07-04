import React, { useEffect, useState } from 'react'
import { getStoreRatings } from '../../apis/Store'
import { useSelector } from 'react-redux';
import { getAverageRating } from '../../utility/AverageRating';

export default function StoreOwnerDashboard() {
  const [ratings, setRatings] = useState(null);
  const { token } = useSelector(state => state.auth);

  const fetchRatings = async () => {
    try {
      const res = await getStoreRatings(token);
      if (res) {
        setRatings(res);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  console.log(ratings);

  return (
    <div className='flex flex-col gap-4'>
      <span className='ml-[3%] mt-5 text-2xl font-medium'>{`Average Rating: ${getAverageRating(ratings)}`}</span>
      <div className='w-[100%] mx-auto'>
        <div className="w-full h-2/3 flex flex-col overflow-y-scroll overflow-x-hidden">
          {ratings?.length > 0 ? (
            <table className="mx-auto my-0.5 w-[95%] max-w-4xl overflow-y-scroll overflow-x-hidden border-collapse text-center">
              <thead className="bg-blue-600 text-white font-poppins text-sm font-semibold">
                <tr>
                  <th className="py-2.5 w-11">S.No</th>
                  <th className="py-2.5 w-28">User Name</th>
                  <th className="py-2.5 w-28">User Address</th>
                  <th className="py-2.5 w-20">Rated Store</th>
                  
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating, index) => (
                  <tr className="even:bg-blue-200" key={rating?._id}>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{index + 1}</td>
                    <td className="py-2 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-black font-poppins text-sm font-semibold">
                      {rating?.user?.name}
                    </td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{rating?.user.address}</td>
                    <td className="py-2 text-black font-poppins text-sm font-semibold">{rating?.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No ratings available</p>
          )}
        </div>
      </div>
    </div>
  );
}
