import toast from "react-hot-toast";
import axios from "axios";
const backendURL=process.env.REACT_APP_BACKEND_BASE_URL;

export const createRating=async(rating,storeId,token)=>{
   try {
        const result = await axios.post(`${backendURL}/store/createrating`,{rating,storeId}, {
        headers:{
            Authorization:`Bearer ${token}`
        },
        validateStatus(status) {
            return status === 201 || status===400||status === 401 || status === 403; // Only resolve these status codes
        }
       });

    if (result.status === 201) {
        toast.success("Rating creatd succesfully..."); // Show success toast
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

export const updateRating=async(rating,storeId,token)=>{
    try {
         const result = await axios.patch(`${backendURL}/store/updaterating`,{rating,storeId}, {
         headers:{
             Authorization:`Bearer ${token}`
         },
         validateStatus(status) {
             return status === 201 ||status===400|| status === 401 || status === 403; // Only resolve these status codes
         }
        });
 
     if (result.status === 201) {
         toast.success("Rating creatd succesfully..."); // Show success toast
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