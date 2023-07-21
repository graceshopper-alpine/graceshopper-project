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

  function randomPastelColor() {
    // This will make the color pastel by blending with white
    const pastelMix = [255, 255, 255];
    // This will desaturate the color by blending with a neutral gray
    const desaturationMix = [200, 200, 200];

    const base = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    let color = [];

    for (let i = 0; i < 3; i++) {
      // First, create the pastel version of the color
      let pastelColor = (base[i] + pastelMix[i]) / 2;
      // Then, desaturate it slightly
      color[i] = Math.floor((pastelColor + desaturationMix[i]) / 2);
    }

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  return (
    <div className="products-container">
      {products.map((p) => {
        const bgColor = randomPastelColor();

        return <Product product={p} key={`Product: ${p.id}`} color={bgColor} />;
      })}
    </div>
  );
};

export default Products;
