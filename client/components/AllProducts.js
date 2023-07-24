import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  const products = useSelector((state) => state.productsSlice.allProducts); // select data from redux store

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="products-container">
      {products.map((p) => {

        return <Product product={p} key={`Product: ${p.id}`} color={bgColor} />;
      })}
    </div>
  );
};

export default Products;
