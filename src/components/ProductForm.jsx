import React, { useState } from "react";

const ProductForm = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    price: "",
    quantity: "",
    image: "",
    description: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity < 0)
      newErrors.quantity = "Valid quantity is required";
    if (formData.rating && (formData.rating < 0 || formData.rating > 5))
      newErrors.rating = "Rating must be 0-5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addProduct(formData);
      setFormData({
        name: "",
        category: "Electronics",
        price: "",
        quantity: "",
        image: "",
        description: "",
        rating: "",
      });
    }
  };

  return (
    <div className="form-card">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {errors.name && (
            <div
              style={{
                color: "#e74c3c",
                fontSize: "0.9rem",
                marginTop: "0.3rem",
              }}
            >
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Sports">Sports</option>
              <option value="Home Appliances">Home Appliances</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rating (0-5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="99.99"
            />
            {errors.price && (
              <div
                style={{
                  color: "#e74c3c",
                  fontSize: "0.9rem",
                  marginTop: "0.3rem",
                }}
              >
                {errors.price}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="10"
            />
            {errors.quantity && (
              <div
                style={{
                  color: "#e74c3c",
                  fontSize: "0.9rem",
                  marginTop: "0.3rem",
                }}
              >
                {errors.quantity}
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Product description..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
