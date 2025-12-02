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
  const [categories] = useState(["All", ...allCategories.map((c) => c.name)]);
  const [stats, setStats] = useState({
    totalValue: 0,
    totalProducts: 0,
    lowStockCount: 0,
  });

  // Calculate statistics
  useEffect(() => {
    const totalValue = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    const lowStockCount = products.filter((p) => p.quantity < 5).length;

    setStats({
      totalValue,
      totalProducts: products.length,
      lowStockCount,
    });
  }, [products]);

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Math.max(...products.map((p) => p.id)) + 1,
      quantity: parseInt(newProduct.quantity),
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating),
      color: newProduct.color ? newProduct.color.split(",") : ["Black"],
      tags: newProduct.tags
        ? newProduct.tags.split(",").map((t) => t.trim())
        : ["new"],
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct(null);
      }
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="app">
      <Header
        total={stats.totalValue}
        productCount={stats.totalProducts}
        lowStockCount={stats.lowStockCount}
      />

      <div className="main-container">
        {selectedProduct ? (
          <div className="product-detail-container">
            <button
              className="back-button"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back to Products
            </button>
            <ProductDetail
              product={selectedProduct}
              onUpdateQuantity={updateQuantity}
              onDelete={deleteProduct}
            />
          </div>
        ) : (
          <>
            <div className="sidebar">
              <ProductForm addProduct={addProduct} />

              <div className="stats-card">
                <h3>📊 Inventory Stats</h3>
                <div className="stat-item">
                  <span>Total Products:</span>
                  <strong>{stats.totalProducts}</strong>
                </div>
                <div className="stat-item">
                  <span>Total Value:</span>
                  <strong>${stats.totalValue.toFixed(2)}</strong>
                </div>
                <div className="stat-item">
                  <span>Low Stock Items:</span>
                  <strong className="low-stock-stat">
                    {stats.lowStockCount}
                  </strong>
                </div>
                <div className="stat-item">
                  <span>Avg. Rating:</span>
                  <strong>
                    {(
                      products.reduce((sum, p) => sum + p.rating, 0) /
                      products.length
                    ).toFixed(1)}
                    /5
                  </strong>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="filter-section">
                <div className="filter-header">
                  <h3>Filter Products</h3>
                  <div className="product-count">
                    Showing {filteredProducts.length} of {products.length}{" "}
                    products
                  </div>
                </div>
                <div className="category-buttons">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`category-btn ${
                        selectedCategory === category ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "All" ? "All Products" : category}
                      {category !== "All" && (
                        <span className="category-count">
                          (
                          {
                            products.filter((p) => p.category === category)
                              .length
                          }
                          )
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <ProductList
                products={filteredProducts}
                updateQuantity={updateQuantity}
                onProductSelect={setSelectedProduct}
                onDelete={deleteProduct}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
