import React from "react";

const Header = ({ total, productCount }) => {
  return (
    <header className="header">
      <div>
        <h1>Product Manager</h1>
        <div className="total">Total Inventory Value: ${total.toFixed(2)}</div>
      </div>
    </header>
  );
};

export default Header;
