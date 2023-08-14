import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>Actor: {product?.attributes?.Actor}</h3>
      <p>Age: {product?.attributes?.Age}</p>
      <p>Language: {product?.attributes?.Language}</p>
      <p>Theme: {product?.attributes?.Theme}</p>
    </div>
  );
};

export default ProductCard;
