import React from "react";
import { Link } from "react-router-dom";

const Product = ({ prooduct }) => {
  return (
    <section>
      <Link to={`/products/${product.id}`} className="product-section">
        <img src={product.image_url} />
        {product.name}
        {product.price}
      </Link>
    </section>
  );
};

export default Product;
