//import all necessary things
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

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      {products.map((p) => {
        return <Product product={p} key={`Product: ${p.id}`} />;
      })}
    </>
  );
};

export default Products;
