import React, { useState } from 'react';
import name from '../../../assets/name.png';
import gmail from '../../../assets/gmail.png';
import lock from '../../../assets/lock.png';
import view from '../../../assets/view.png';
import { toast } from 'react-hot-toast';
import { updatePassword } from '../../../apis/Auth';
import { useDispatch, useSelector } from 'react-redux';

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPsd, setShowConfirmPsd] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitHandler = async () => {
    if (!formData.oldPassword || !formData.newPassword) {
      toast.error('Please Fill All Field');
      return;
    } else if (
      /^[a-z]+$/.test(formData.newPassword) ||
      /^[A-Z]+$/.test(formData.newPassword) ||
      /^\d+$/.test(formData.newPassword) ||
      formData.newPassword.length < 6
    ) {
      toast.error('Password must contain at least 1 capital letter, 1 small letter, 1 numeric value, and be longer than 6 characters');
      return;
    } else if (formData.oldPassword === formData.newPassword) {
      toast.error('Password Should be Different');
      return;
    }

    const res = await updatePassword(formData, token, dispatch);
    if (res) {
      setFormData({
        ...formData,
        oldPassword: '',
        newPassword: ''
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-black font-semibold text-lg mt-8 ml-8">Settings</h2>
      <div className="flex flex-col gap-4 w-1/3 ml-8">
        <div className="flex gap-2 p-1 border border-gray-300 rounded-lg h-9">
          <img src={name} alt="name" className="w-6 cursor-pointer" />
          <input type="text" required placeholder="Name" name="name" value={formData.name} className="w-full outline-none border-none text-gray-500 text-base font-normal" />
        </div>
        <div className="flex gap-2 p-1 border border-gray-300 rounded-lg h-9">
          <img src={gmail} alt="mail" className="w-6 cursor-pointer" />
          <input type="text" required placeholder="Email" name="email" value={formData.email} className="w-full outline-none border-none text-gray-500 text-base font-normal" />
        </div>
        <div className="flex gap-2 p-1 border border-gray-300 rounded-lg h-9">
          <img src={lock} alt="password" className="w-6 cursor-pointer" />
          <input type={showPassword ? 'text' : 'password'} required placeholder="Enter Your Old Password" name="oldPassword" value={formData.oldPassword} onChange={onChangeHandler} className="w-full outline-none border-none text-gray-500 text-base font-normal" />
          <img src={view} alt="view" onClick={() => setShowPassword(!showPassword)} className="w-6 cursor-pointer" />
        </div>
        <div className="flex gap-2 p-1 border border-gray-300 rounded-lg h-9">
          <img src={lock} alt="confirmPassword" className="w-6 cursor-pointer" />
          <input type={showConfirmPsd ? 'text' : 'password'} placeholder="Enter Your New Password" name="newPassword" value={formData.newPassword} required onChange={onChangeHandler} className="w-full outline-none border-none text-gray-500 text-base font-normal" />
          <img src={view} alt="view" onClick={() => setShowConfirmPsd(!showConfirmPsd)} className="w-6 cursor-pointer" />
        </div>
      </div>
      <button className="w-1/3 h-9 bg-teal-500 text-white text-sm font-normal cursor-pointer rounded-full ml-8" onClick={onSubmitHandler}>Update</button>
    </div>
  );
}
