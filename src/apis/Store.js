import axios from "axios";
import { toast } from 'react-hot-toast';
import { setToken } from "../slices/authSlice";
const backendURL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to handle user login
export const createStore = async (formdata,token) => {
    try {
        
        const result = await axios.post(`${backendURL}/store/createstore`, formdata, {
            headers:{
                Authorization:`Bearer ${token}`
            },
            validateStatus(status) {
                return status === 201 || status === 401 || status === 403; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success(result.data.message); // Show success toast
            return true; // Return the token if status is 201
        }
        toast.error(result.data.message); // Show error toast
        return false;
        
    } catch (error) {
        toast.error("Internal server error");
        console.log(error); 
        return false; 
    }
}


export const storesAnalytics=async(token)=>{
    try {
        
        const result = await axios.get(`${backendURL}/store/storesAnalytics`, {
            headers:{
                Authorization:`Bearer ${token}`
            },
            validateStatus(status) {
                return status === 201 || status === 401 || status === 403; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success("Data Fetched sucessfully..."); // Show success toast
            return result?.data?.data; // Return the token if status is 201
        }
        toast.error(result.data.message); // Show error toast
        return false;
        
    } catch (error) {
        toast.error("Internal server error");
        console.log(error); 
        return false; 
    }
}

export const getAllStores = async (formdata, token) => {
    try {
      const result = await axios.get(`${backendURL}/store/getallstores`, {
        params: {
          name: formdata.name,
          email: formdata.email,
          address: formdata.address,
          role: formdata.role,
          sortbyname: formdata.sortbyname,
          sortbyaddress: formdata.sortbyaddress 
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus(status) {
          return status === 200 || status === 401 || status === 403; // Only resolve these status codes
        }
      });
  
      if (result.status === 200) {
        toast.success('Stores fetched successfully'); // Show success toast
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


export const getStoreRatings=async (token)=>{
  try {
    const result = await axios.get(`${backendURL}/store/storeratings`, {
      headers:{
          Authorization:`Bearer ${token}`
      },
      validateStatus(status) {
          return status === 200 || status === 401 || status === 403; // Only resolve these status codes
      }
  });

  if (result.status === 200) {
      toast.success("Ratings Fetched sucessfully..."); // Show success toast
      return result?.data?.ratings; // Return the token if status is 201
  }
  toast.error(result.data.message); // Show error toast
  return false;
  } catch (error) {
    toast.error('Internal server error'); // Show error toast for any exception
      console.log(error); // Log the error for debugging
      return false; // Return false in case of an exception
  }
}