import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./AddFood.css";
import axios from "axios";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const [data, setDate] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please select the image");
      return;
    }
    const formData = new FormData();
    formData.append("food", JSON.stringify(data));
    formData.append("file", image);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/foods",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.status == 201) {
        alert("Food Added Successfully");
        setDate({ name: "", description: "", price: "", category: "" });
      }
    } catch (error) {
      alert("Error in Adding Food");
      console.log(error);
      
    }
  };
  return (
    <div className="container add-food-container">
      <h2 className="text-center mb-4">Add Food</h2>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form className="contact-form" onSubmit={onSubmitHandler}>
            <div className="form-group text-center upload-box">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload}
                  width={90}
                  alt="upload"
                />
              </label>
              <input
                type="file"
                id="image"
                required
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Food Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                onChange={onChangeHandler}
                value={data.description}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                className="form-control"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option value="Biryani">Biryani</option>
                <option value="Pizza">Pizza</option>
                <option value="Cake">Cake</option>
                <option value="Burger">Burger</option>
                <option value="Rolls">Rolls</option>
                <option value="Ice Cream">Ice Cream</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                onChange={onChangeHandler}
                value={data.price}
              />
            </div>

            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
