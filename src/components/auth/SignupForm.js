import React, { useState } from 'react';
import lock from '../../assets/lock.png';
import gmail from '../../assets/gmail.png';
import view from '../../assets/view.png';
import name from '../../assets/name.png';
import { toast } from 'react-hot-toast';
import { signup } from '../../apis/Auth';
import validator from 'validator'
export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      toast.error("Please Fill All Fields");
      return;
    }
    
    else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
       toast.error("Invalid Name");
       return
    }
    else if(!validator.isEmail(formData.email)){
       toast.error("Invalid Email");
       return
    }
    else if(/^[a-z]+$/.test(formData.password) ||/^[A-Z]+$/.test(formData.password) || /^\d+$/.test(formData.password) || formData.password.length < 8  ){
      toast.error("Weak Password!!,Password must contain at least 1 capital letter, 1 small letter, 1 numeric value, and be longer than 6 characters");
      return;
    }
    else if(formData.address.length<=40||formData.address.length>=400){
      toast.error("Address length must be greater than 40 character and less 400 character");
      return
    }
    
    const res=await signup(formData);
    if(res){
      setFormData({
        name: "",
        email: "",
        password: "",
        address: ""
      })
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-gray-700 font-semibold text-lg">Register</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
          <img src={name} alt="Name" className="w-6 h-6 cursor-pointer" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            className="outline-none flex-1 ml-2 text-base text-gray-700"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
          <img src={gmail} alt="Gmail" className="w-6 h-6 cursor-pointer" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="outline-none flex-1 ml-2 text-base text-gray-700"
          />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md px-2 py-1">
          <img src={lock} alt="Lock" className="w-6 h-6 cursor-pointer" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="outline-none flex-1 ml-2 text-base text-gray-700"
          />
          <img
            src={view}
            alt="View"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <textarea
          placeholder="Enter address"
          required
          name="address"
          value={formData.address}
          onChange={onChangeHandler}
          className="w-full border border-gray-300 rounded-md px-2 py-1 text-base text-gray-700 outline-none"
        ></textarea>
      </div>
      <button
        className="mt-4 w-full bg-blue-500 text-white text-base font-semibold rounded-lg py-2 focus:outline-none"
        onClick={submitHandler}
      >
        Register
      </button>
    </div>
  );
}
