import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";
import Header from "./components/Header";
import {
  products as initialProducts,
  categories as allCategories,
} from "./data";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id)) + 1,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating),
    };
    setProducts([...products, productWithId]);
  };

  const updateQuantity = (productId, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          const newQuantity = Math.max(0, product.quantity + change);
          return { ...product, quantity: newQuantity };
        }
        return product;
      })
    );
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const total = products.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <div className="app">
      <Header total={total} productCount={products.length} />

      <div className="container">
        {selectedProduct ? (
          <div>
            <button
              className="back-btn"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back
            </button>
            <ProductDetail
              product={selectedProduct}
              onUpdateQuantity={updateQuantity}
              onDelete={deleteProduct}
            />
          </div>
        ) : (
          <div className="main-content">
            <div className="sidebar">
              <ProductForm addProduct={addProduct} />

              <div className="stats">
                <h3>Inventory Summary</h3>
                <div className="stat">
                  <span>Total Products:</span>
                  <strong>{products.length}</strong>
                </div>
                <div className="stat">
                  <span>Total Value:</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <div className="stat">
                  <span>Low Stock:</span>
                  <strong>
                    {products.filter((p) => p.quantity < 5).length}
                  </strong>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="filter">
                <h3>Products</h3>
                <div className="categories">
                  {["All", ...new Set(products.map((p) => p.category))].map(
                    (category) => (
                      <button
                        key={category}
                        className={`cat-btn ${
                          selectedCategory === category ? "active" : ""
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>

              <ProductList
                products={filteredProducts}
                updateQuantity={updateQuantity}
                onProductSelect={setSelectedProduct}
                onDelete={deleteProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
