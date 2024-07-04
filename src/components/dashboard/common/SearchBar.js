import { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import {getAllUsers} from '../../../apis/Auth'
import location from '../../../assets/location.png'
import name from '../../../assets/name.png'

import {getAllStores} from '../../../apis/Store'
export default function SearchBar({setData,userType}) {
  
  const { token } = useSelector((state) => state.auth);
  const {user}=useSelector(state=>state.profile)
  const [formdata, setformdata] = useState({
    name: "",
    address: "",
  });
  const [filterData,setfilterData]=useState({
    sortbyname:'',
    sortbyaddress:'',
    role:''
  })

  const fetchUsers=async ()=>{
    const result=userType=='admin'?await getAllUsers({...formdata,...filterData},token):await getAllStores({...formdata,...filterData},token);
    console.log(result);
    if(result){
     setData(result);
    }
   }

  // Function to apply filters
  const applyFilterHandler = async () => {
    fetchUsers()
  };

  // Event handler for input change (search)
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onChangeFilterhandler=(event)=>{
    const { name, value } = event.target;
    setfilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // Clear data handler
  const cleardataHandler = () => {
    setformdata({
      name: "",
      address: "",
      role: "",
    });
    setfilterData({
      sortbyname:'',
      sortbyaddress:'',
      role:''
    })
    fetchUsers()
  };

  // useEffect hook to trigger job search after a delay when search query changes
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchUsers()
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [formdata]);

  return (
    <div className='w-[80vw] bg-white shadow-lg mx-auto mt-3 rounded-lg'>
      <div className='m-auto flex flex-col gap-6 py-6'>
        {/* Search bar */}
        <div className='flex'>
          <div className='flex w-[45%] mx-auto h-10 items-center justify-center gap-4 rounded-md border-2 border-lightgrey'>
            <img alt="search" className='h-7 w-7 ml-6' src={name}/>
            <input
              type='text'
              placeholder='Enter Name'
              className='outline-none w-[100%] h-full text-lg text-richblack-500 font-normal'
              name='name'
              value={formdata.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className='flex w-[50%] mx-auto h-10 items-center justify-center gap-4 rounded-md border-2 border-lightgrey'>
          <img alt="search" className='h-7 w-7 ml-6' src={location} />
          <input
            type='text'
            placeholder='Enter Address'
            className='outline-none w-[100%] h-full text-lg text-richblack-500 font-normal'
            name='address'
            value={formdata.address}
            onChange={onChangeHandler}
          />
        </div>
        </div>
        {/* Role and Sort-By selection */}
        <div className="flex w-[90%] mx-auto justify-between items-baseline">
          <div className='flex items-baseline gap-4'>
            {
              user.role==='admin'&&(
                <select id="role" className='flex' name='role' value={formdata.role} onChange={onChangeFilterhandler} value={filterData.role}>
                  <option value="" disabled>Select-Role</option>
                  <option value="admin">Admin</option>
                  <option value="storeOwner">Store Owner</option>
                  <option value="user">Normal User</option>
                </select>
              )
            }
            <select id="sortByName" className='flex' onChange={onChangeFilterhandler} name='sortbyname' value={filterData.sortbyname}>
              <option value="" disabled selected>Sort-By-Name</option>
              <option value="ascd">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select id="sortByAddress" className='flex' onChange={onChangeFilterhandler} name='sortbyaddress' value={filterData.sortbyaddress}>
              <option value="" disabled selected>Sort-By-Address</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Buttons for applying filters and clearing selected role */}
          <div className='flex gap-5 mr-4'>
            <button className='w-28 h-7 bg-red-500 rounded-sm text-white font-medium text-1xl' onClick={applyFilterHandler}>Apply filter</button>
            <button className='text-1xl text-red font-normal' onClick={cleardataHandler}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
}
