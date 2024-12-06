import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    food_name: '',
    nf_calories: '',
    serving_qty: '',
    serving_unit: '',
    nf_total_fat: '',
    nf_protein: '',
    nf_total_carbohydrate: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/foods');
      setFoodItems(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing food item
        await axios.put(`http://localhost:5001/api/foods/${editId}`, formData);
      } else {
        // Add new food item
        await axios.post('http://localhost:5001/api/foods', formData);
      }

      fetchFoodItems();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      food_name: '',
      nf_calories: '',
      serving_qty: '',
      serving_unit: '',
      nf_total_fat: '',
      nf_protein: '',
      nf_total_carbohydrate: '',
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (food) => {
    setFormData(food);
    setIsEditing(true);
    setEditId(food._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/foods/${id}`);
      fetchFoodItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Form for Adding/Editing Food */}
      <form onSubmit={handleFormSubmit} className="mb-5">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Food Name"
              value={formData.food_name}
              onChange={(e) => setFormData({ ...formData, food_name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Calories"
              value={formData.nf_calories}
              onChange={(e) => setFormData({ ...formData, nf_calories: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Serving Quantity"
              value={formData.serving_qty}
              onChange={(e) => setFormData({ ...formData, serving_qty: e.target.value })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Serving Unit"
              value={formData.serving_unit}
              onChange={(e) => setFormData({ ...formData, serving_unit: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Total Fat (g)"
              value={formData.nf_total_fat}
              onChange={(e) => setFormData({ ...formData, nf_total_fat: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Protein (g)"
              value={formData.nf_protein}
              onChange={(e) => setFormData({ ...formData, nf_protein: e.target.value })}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Carbohydrates (g)"
              value={formData.nf_total_carbohydrate}
              onChange={(e) => setFormData({ ...formData, nf_total_carbohydrate: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          {isEditing ? 'Update Food' : 'Add Food'}
        </button>
      </form>

      {/* Display Food Items */}
      <ul className="list-group">
        {foodItems.map((food) => (
          <li key={food._id} className="list-group-item d-flex justify-content-between align-items-center">
            {food.food_name} - {food.nf_calories} calories
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(food)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(food._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
