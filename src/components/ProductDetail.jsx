import React from "react";

const ProductDetail = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-detail">
      <div className="detail-header">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-meta">
            <span className="category">{product.category}</span>
            <span className="rating">⭐ {product.rating}/5</span>
            <span className="price">${product.price.toFixed(2)}</span>
          </div>
          <div className="stock-info">
            <p>In Stock: {product.quantity} units</p>
            {product.quantity < 5 && (
              <p className="low-stock-warning">⚠ Low Stock Warning!</p>
            )}
          </div>
        </div>
      </div>

      <div className="detail-content">
        <div className="section">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className="section">
          <h3>Specifications</h3>
          <p>{product.specifications}</p>
        </div>

        <div className="section">
          <h3>Product Value</h3>
          <div className="value-calculations">
            <p>Price per unit: ${product.price.toFixed(2)}</p>
            <p>Quantity: {product.quantity} units</p>
            <p className="subtotal">
              Subtotal: ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
