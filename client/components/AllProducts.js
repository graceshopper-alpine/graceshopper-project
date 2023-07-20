//import all necessary things
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../store/productsSlice";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  const products = useSelector((state) => state.products.allProducts); // select data from redux store

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      {products && products.length ? (
        products.map((product) => (
          <Link to={`/products/${product.id}`} key={`Product: ${product.id}`}>
            <div className="product-section">
              <img src={product.image_url} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No Products Available.</p>
      )}
    </div>
  );
};

export default Products;
