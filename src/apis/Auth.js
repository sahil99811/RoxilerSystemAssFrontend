import axios from "axios";
import { toast } from 'react-hot-toast';
import { setToken } from "../slices/authSlice";
import {setUser} from '../slices/profileSlice'
const backendURL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to handle user login
export const login = async (formdata,dispatch) => {
    try {
        console.log(backendURL);
        const result = await axios.post(`${backendURL}/auth/login`, formdata, {
            validateStatus(status) {
                return status === 201 || status === 401 ||status===400 ||status===404; // Only resolve these status codes
            }
        });
        
        if (result.status === 201) {
            toast.success(result.data.message); // Show success toas
            dispatch(setToken(result.data.token));
            console.log(result.data.user.role)
            dispatch(setUser(result.data.user));
            localStorage.setItem('token', JSON.stringify(result.data.token)); // Store token in local storag
            localStorage.setItem('role',JSON.stringify(result.data.user));
            return true; // Return the token if status is 201
        } else {
            toast.error(result.data.message); // Show error toast
            return false; // Return null if status is 401 or 403
        }
    } catch (error) {
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return null; // Return null in case of an exception
    }
}

// Function to handle user signup
export const signup = async (formdata) => {
    try {
        const result = await axios.post(`${backendURL}/auth/signup`, formdata, {
            validateStatus(status) {
                return status === 400 || status === 409 || status === 201; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success('Signup Successfully....'); // Show success toast
            return true; // Return true if status is 201
        }else if(result.status === 409){
            toast.error(result.data.message); // Show success toast
            return false; // Return true if status is 201
        }
        toast.error(result.data.message); // Show error toast if status is 400 or 409
        return false; // Return false if status is 400 or 409
    } catch (error) {
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return false; // Return false in case of an exception
    }
}

export const updatePassword=async (formdata,token,dispatch)=>{
    try{
       const result=await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/updatepassword`,formdata,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        validateStatus(status) {
            return status === 400 || status === 401 || status === 403||status===404||status===200; // Only resolve these status codes
        }
       });
       if(result?.status===200){
            toast.success(result.data.message); // Show success toast
            dispatch(setToken(null));
            return true; // Return true if status is 201
       }
       else if(result?.status===401&&result?.data?.message==='Incorrect'){
             toast.error("InCorrect OldPassword"); // Show success toast
             return false; // Return true if status is 201
       }
       console.log(result.data)
       dispatch(setToken(null));
       toast.error(result.data.message); // Show error toast if status is 400 or 409
      return false;
    }catch(error){
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return false; // Return false in case of an exception
    }
}



export const getAllUsers = async (formdata, token) => {
    try {
      const result = await axios.get(`${backendURL}/user/getalluser`, {
        params: {
          name: formdata.name,
          email: formdata.email,
          address: formdata.address,
          role: formdata.role,
          sortbyname: formdata.sortbyname, // Add sorting by name
          sortbyaddress: formdata.sortbyaddress // Add sorting by address
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus(status) {
          return status === 200 || status === 401 || status === 403; // Only resolve these status codes
        }
      });
  
      if (result.status === 200) {
        toast.success('Users fetched successfully'); // Show success toast
        return result?.data?.data; // Return the data if status is 200
      }
  
      toast.error(result.data.message); // Show error toast
      return false;
    } catch (error) {
      toast.error('Internal server error'); // Show error toast for any exception
      console.log(error); // Log the error for debugging
      return false; // Return false in case of an exception
    }
  };



  // Function to handle user signup
export const addUser = async (formdata,token) => {
    try {
        console.log(formdata);
        const result = await axios.post(`${backendURL}/auth/signup`, formdata, {
            headers:{
                Authorization:`Bearer ${token}`
            },
            validateStatus(status) {
                return status === 400 || status === 409 || status === 201; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success('Account Created Successfully....'); // Show success toast
            return true; // Return true if status is 201
        }else if(result.status === 409){
            toast.error(result.data.message); // Show success toast
            return false; // Return true if status is 201
        }
        toast.error(result.data.message); // Show error toast if status is 400 or 409
        return false; // Return false if status is 400 or 409
    } catch (error) {
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return false; // Return false in case of an exception
    }
}

