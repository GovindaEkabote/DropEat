import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/foods"

export const fetchFoodList = async () => {
   try {
        const response = await axios.get(API_URL);
        return response.data;        
   } catch (error) {
    toast.error("Error to Get Food")
    console.log(error);
    
   }
    
};

export const fetchFoodDetails = async (id) => {
    try {
      const response = await axios.get(API_URL+"/"+id);
      return response.data;  
    } catch (error) {
      console.log("API in FetchAPI:", error);
    }
  };