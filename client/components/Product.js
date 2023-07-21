import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, color }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <section
        className="product-list-container"
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#FFD4A1";
        }}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#EDEDED")}
      >
        <img src={`https://picsum.photos/seed/${product.id}/200`} />
        <span className="product-list-item-details">
          <h3 name="product">{product.name.toUpperCase()}</h3>
          <h3 name="price">{product.price}</h3>
        </span>
      </section>
    </Link>
  );
};

export default Product;
