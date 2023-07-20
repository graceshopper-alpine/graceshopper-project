//import all necessary things
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  const products = useSelector((state) => state.products.allProducts); // select data from redux store

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      {products.map((p) => {
        <Product product={p} key={`Product: ${p.id}`} />;
      })}
    </>
  );
};

export default Products;
