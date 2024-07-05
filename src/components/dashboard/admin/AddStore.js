import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {createStore} from '../../../apis/Store'
import { useSelector } from 'react-redux';
import validator from 'validator';
export default function AddStore() {
    const {token}=useSelector(state=>state.auth)
    const [formdata,setFormData]=useState({
      name:"",
      email:"",
      address:"",
      rating:""
    })
    const onChangeHandler=(event)=>{
      const {name,value}=event.target;
      setFormData((prev)=>({
        ...prev,
        [name]:value
      }))
    }
    const onSubmitHandler=(event)=>{
      event.preventDefault();
      if(!formdata.name||!formdata.email||!formdata.address||!formdata.rating){
        toast.error("All field are required");
        return;
      }
      if(Number(formdata.rating)<0||Number(formdata.rating)>5){
        toast.error("Rating value shoulbe 0 to 5");
        return;
      }
      if(formdata.name.length<8||formdata.name.length>20){
        toast.error("Name length should be 20 to 60");
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
      console.log(formdata.rating);
      const result=createStore(formdata,token);
      if(result){
        setFormData({
          name:"",
          email:"",
          address:"",
          rating:""
        })
      }
    }
    return (
      <div className='w-[100%] h-[100vh] flex items-center justify-center'>
        <form className='w-[50%] m-auto flex flex-col gap-3 p-5  rounded-md border-2 border-gray-300' onSubmit={onSubmitHandler}>
          <h2 className='text-black font-medium text-2xl'>Add Store</h2>
          
          <div className='flex w-[100%]'>
            <label htmlFor='name' className='text-black text-lg w-[40%]'>Enter Store Name</label>
            <input id='name' type='text' className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter Store name here' required name='name' value={formdata.name} onChange={onChangeHandler} />
          </div>
          <div className='flex w-[100%]'>
            <label htmlFor='email' className='text-black text-lg w-[40%]'>Email</label>
            <input type="email" id="email" className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter Store Owner Email Id' required name='email' value={formdata.email} onChange={onChangeHandler}/>
          </div>
          <div className='flex w-[100%]'>
            <label htmlFor='rating' className='text-black text-lg w-[40%]'>Rating</label>
            <input type="Number" id="rating" className="w-[60%] rounded border-2 border-gray-300 h-7 text-lg text-black font-normal outline-none" placeholder='Enter Default Store Rating' required name='rating' value={formdata.rating} onChange={onChangeHandler}/>
          </div>
        
  
          
          <div className='flex w-[100%]'>
            <label className='text-black text-lg w-[40%]'>Address</label>
            <textarea className="w-[60%] rounded border-2 border-gray-300 h-20 text-lg text-black font-normal outline-none" placeholder='Enter Store Address' required name='address' value={formdata.address} onChange={onChangeHandler}></textarea>
          </div>
  
          <div className='flex justify-end gap-3'>
            <Link to="/dashboard">
              <button className='w-24 h-8 rounded-md border-2 border-gray-300 font-medium text-lg text-gray-600'>Cancel</button>
            </Link>
            <button className="w-24 h-8 bg-red-500 rounded-md text-white font-medium text-lg" type='submit'>Add</button>
          </div>
        </form>
      </div>
    );
}
