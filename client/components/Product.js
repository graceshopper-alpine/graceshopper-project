import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, color }) => {
  return (
    <Link to={`/products/${product.id}`} >
      <div className="product-list-container-outer">
      <section className="product-list-container">
          <img src={`https://picsum.photos/seed/${product.id}/200`} />
      </section>
        <span className="product-list-item-details">
            <h3 name='product'>{product.name.toUpperCase()}</h3>
            <h3 name='price'>{product.price}</h3>
          </span>
      </div>
    </Link>

  );
};

export default Product;
