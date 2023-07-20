import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <section>
      <Link to={`/products/${product.id}`} className="product-section">
        <img src={product.image_url} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </Link>
    </section>
  );
};

export default Product;
