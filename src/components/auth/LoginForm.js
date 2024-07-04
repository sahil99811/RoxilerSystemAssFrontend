import React, { useState } from 'react';
import lock from '../../assets/lock.png';
import gmail from '../../assets/gmail.png';
import view from '../../assets/view.png';
import { toast } from 'react-hot-toast';
import { login } from '../../apis/Auth';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    await login(formData, dispatch);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-gray-700 font-semibold text-lg">Login</h2>
      <div className="mt-6 space-y-4">
        <div className="border border-gray-300 rounded-md px-2 py-1 flex items-center">
          <img src={gmail} alt="Mail" className="w-6 h-6 cursor-pointer" />
          <input
            type="text"
            required
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            className="outline-none ml-2 flex-1 text-base text-gray-700"
          />
        </div>
        <div className="border border-gray-300 rounded-md px-2 py-1 flex items-center">
          <img src={lock} alt="Password" className="w-6 h-6 cursor-pointer" />
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            className="outline-none ml-2 flex-1 text-base text-gray-700"
          />
          <img
            src={view}
            alt="View"
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
      </div>
      <button
        className="mt-4 w-full bg-blue-500 text-white text-base font-semibold rounded-lg py-2 focus:outline-none"
        onClick={submitHandler}
      >
        Log in
      </button>
    </div>
  );
}
