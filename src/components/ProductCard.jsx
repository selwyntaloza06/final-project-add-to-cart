import React from "react";

const ProductCard = ({
  product,
  updateQuantity,
  onProductSelect,
  onDelete,
}) => {
  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity < 5;

  return (
    <div className={`product-card ${isLowStock ? "low-stock" : ""}`}>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        onClick={() => onProductSelect(product)}
      />

      <div className="product-info">
        <h3 className="product-name" onClick={() => onProductSelect(product)}>
          {product.name}
        </h3>
        <div className="product-meta">
          {product.category} • {product.quantity} units • ⭐ {product.rating}
        </div>
        {isLowStock && (
          <div
            style={{ color: "#e74c3c", fontSize: "0.9rem", fontWeight: "500" }}
          >
            ⚠ Low Stock
          </div>
        )}
      </div>

      <div className="product-price">
        ${product.price.toFixed(2)}
        <div
          style={{ fontSize: "0.9rem", color: "#7f8c8d", marginTop: "0.3rem" }}
        >
          Subtotal: ${subtotal.toFixed(2)}
        </div>
      </div>

      <div className="quantity-controls">
        <button
          onClick={() => updateQuantity(product.id, -1)}
          disabled={product.quantity <= 0}
          className="quantity-btn"
        >
          -
        </button>
        <span
          style={{ fontWeight: "600", minWidth: "30px", textAlign: "center" }}
        >
          {product.quantity}
        </span>
        <button
          onClick={() => updateQuantity(product.id, 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>

      <div className="product-actions">
        <button
          className="action-btn view-btn"
          onClick={() => onProductSelect(product)}
        >
          View
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
    