import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { deleteFood, getFoodList } from "../../services/foodServices";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchlist = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("API error");
      console.log(error);
      
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);

  // Delete food By ID
  const handleDelete = async (id) => {
    try {
    await deleteFood(id);
    setList(list.filter((food) => food.id !== id));
    toast.success("Food deleted successfully");
    } catch (error) {
      toast.error("Enable to delete Food");
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Food List</h5>
        </div>

        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      height="50"
                      width="50"
                      style={{ objectFit: "cover", borderRadius: "6px" }}
                    />
                  </td>

                  <td>{item.name}</td>

                  <td>{item.description}</td>

                  <td>₹{item.price}</td>

                  <td className="text-center text-danger">
                    <FaTrash
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "18px",
                      }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {list.length === 0 && (
            <div className="text-center p-4 text-muted">
              No food items available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListFood;
