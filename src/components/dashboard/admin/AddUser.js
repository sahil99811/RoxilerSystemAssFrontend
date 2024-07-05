import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {addUser} from '../../../apis/Auth'
import { useSelector } from 'react-redux';
import validator from 'validator';
export default function AddUser() {
    const {token}=useSelector(state=>state.auth)
    const [formdata,setFormData]=useState({
      name:"",
      role:"",
      email:"",
      address:"",
      password:""
    })
    const onChangeHandler=(event)=>{
      const {name,value}=event.target;
      setFormData((prev)=>({
        ...prev,
        [name]:value
      }))
    }
    const onSubmitHandler=async (event)=>{
      event.preventDefault();
      if(!formdata.name||!formdata.email||!formdata.address||!formdata.role||!formdata.password){
        toast.error("All field are required");
        return;
      }
      if (!/^[a-zA-Z\s]+$/.test(formdata.name)) {
        toast.error("Invalid Name");
        return
     }
     else if(!validator.isEmail(formdata.email)){
        toast.error("Invalid Email");
        return
     }
     else if(/^[a-z]+$/.test(formdata.password) ||/^[A-Z]+$/.test(formdata.password) || /^\d+$/.test(formdata.password) || formdata.password.length < 8  ||formdata.password.length > 20 ){
       toast.error("Weak Password!!,Password must contain at least 1 capital letter, 1 small letter, 1 numeric value, and be longer than 6 characters");
       return;
     }
     else if(formdata.address.length<=40||formdata.address.length>=400){
       toast.error("Address length must be greater than 40 character and less 400 character");
       return
     }
      const result=await addUser(formdata,token);
      console.log(result)
      if(result==true){
        setFormData({
          name:"",
          role:"",
          email:"",
          address:"",
          password:""
        })
      }
    }
    return (
      <div className='w-[100%] h-[100vh] flex items-center justify-center'>
        <form className='w-[50%] m-auto flex flex-col gap-3 p-5  rounded-md border-2 border-gray-300' onSubmit={onSubmitHandler}>
          <h2 className='text-black font-medium text-2xl'>Add User</h2>
          
          <div className='flex w-[100%]'>
            <label htmlFor='name' className='text-black text-lg w-[40%]'>Enter Name</label>
            <input id='name' type='text' className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter name here' required name='name' value={formdata.name} onChange={onChangeHandler} />
          </div>
          <div className='flex w-[100%]'>
            <label htmlFor='email' className='text-black text-lg w-[40%]'>Email</label>
            <input type="email" id="email" className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter Email' required name='email' value={formdata.email} onChange={onChangeHandler}/>
          </div>
          <div className='flex w-[100%]'>
            <label htmlFor='password' className='text-black text-lg w-[40%]'>Password</label>
            <input type="text" id="email" className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter Password' required name='password' value={formdata.password} onChange={onChangeHandler}/>
          </div>
          <div className='flex w-[100%]'>
            <label htmlFor="gender" className='text-black text-lg w-[40%]' >Role</label>
            <select id="gender" className='w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none' required name='role' value={formdata.role} onChange={onChangeHandler}>
              <option value="" disabled selected>Select Role</option>
              <option value="admin">Admin</option>
              <option value="storeOwner">Store Owner</option>
              <option value="user">Normal User</option>
            </select>
          </div>
          
          
          
          <div className='flex w-[100%]'>
            <label className='text-black text-lg w-[40%]'>Address</label>
            <textarea className="w-[60%] rounded border-2 border-gray-300 h-20 text-lg text-black font-normal outline-none" placeholder='Enter address' required name='address' value={formdata.address} onChange={onChangeHandler}></textarea>
          </div>
  
          <div className='flex justify-end gap-3'>
            <Link to="/">
              <button className='w-24 h-8 rounded-md border-2 border-gray-300 font-medium text-lg text-gray-600'>Cancel</button>
            </Link>
            <button className="w-24 h-8 bg-red-500 rounded-md text-white font-medium text-lg" type='submit'>Add</button>
          </div>
        </form>
      </div>
    );
}
