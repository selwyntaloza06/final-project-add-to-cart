import productsData from "./products.json";

export const { products, categories, brands } = productsData;

// Helper functions for data manipulation
export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === "All") return products;
  return products.filter((product) => product.category === category);
};

export const getCategories = () => {
  return [...new Set(products.map((product) => product.category))];
};

export const getLowStockProducts = () => {
  return products.filter((product) => product.quantity < 5);
};

export const getTotalInventoryValue = () => {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

export const getAverageRating = () => {
  const totalRating = products.reduce(
    (sum, product) => sum + product.rating,
    0
  );
  return (totalRating / products.length).toFixed(1);
};

// Add more data-related helper functions as needed
export default productsData;
