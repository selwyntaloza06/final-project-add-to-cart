import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  updateQuantity,
  onProductSelect,
  onDelete,
}) => {
  if (products.length === 0) {
    return (
      <div
        style={{
          background: "white",
          padding: "3rem",
          textAlign: "center",
          borderRadius: "8px",
          color: "#7f8c8d",
        }}
      >
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          updateQuantity={updateQuantity}
          onProductSelect={onProductSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
