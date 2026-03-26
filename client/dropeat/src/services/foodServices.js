import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8080/api/foods";

export const addFood = async (foodData, image) => {
  const formData = new FormData();
  formData.append("food", JSON.stringify(foodData));
  formData.append("file", image);

  try {
    await axios.post(
      API_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  } catch (error) {
    alert("Error in Adding Food");
    console.log(error);
  }
};


export const getFoodList = async() =>{
  try {
    const response = await axios.get(API_URL);
    return response.data
  } catch (error) {
    toast.error("Error in getting food")
    console.log(error);
  }
}


export const deleteFood = async(id) =>{
  try {
    const response = await axios.delete(`http://localhost:8080/api/foods/${id}`);
      return response;
  } catch (error) {
    toast.error("Error to delete food")
    console.log(error);
  }
}