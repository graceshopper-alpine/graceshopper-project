import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";
import {useSearchParams} from "react-router-dom";
import Product from "./Product";
import Fuse from "fuse.js";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  let products = useSelector((state) => state.productsSlice.allProducts); // select data from redux store
  const [currProducts, setCurrProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const numPerPage = 15;
  // let [searchParams, setSearchParams] = useSearchParams();
  let fuse


  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    //Fuse is a client side search library
    fuse = new Fuse(products, {
      keys: ["name", "category", "description"],
      threshold: 0.3
    })

    let queryParams = new URLSearchParams(window.location.search);
    let query = queryParams.get("q")
    query = decodeURI(query);

    //initialize the current products to be the first N products by ID
    setCurrProducts([...products].sort((a, b) => a.id - b.id).slice(0, numPerPage));

    if (query == "null") {
      setCurrProducts([...products].sort((a, b) => a.id - b.id).slice(0, numPerPage));
      setFilteredProducts([...products].sort((a, b) => a.id - b.id));
      if(products.length <= numPerPage) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } else {

      setFilteredProducts(fuse.search(query).map((result) => result.item));
      setCurrProducts(fuse.search(query).map((result) => result.item).slice(0, numPerPage));
      if(fuse.search(query).map((result) => result.item).length <= numPerPage) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    }
    
  }, [products]);

  const paginate = (type) => {
    if (type == "prev") {
      if (page > 1) {
        let newPage = page - 1;
        setCurrProducts(filteredProducts.slice((newPage-1)*numPerPage, (newPage)*numPerPage));
        setPage(page - 1);
        setIsLastPage(false);
      }
    } else if (type == "next") {
      if (page < Math.ceil(filteredProducts.length / numPerPage)) {
        let newPage = page + 1;
        setCurrProducts(filteredProducts.slice((newPage-1)*numPerPage, (newPage)*numPerPage));
        setPage(page + 1);
        if (newPage == Math.ceil(filteredProducts.length / numPerPage)) {
          setIsLastPage(true);
        }
      }
    }
  }

  const filterProducts = (category) => {
    if (category == "all") {
      setCurrProducts([...products].sort((a, b) => a.id - b.id).slice(0, numPerPage));
      setFilteredProducts([...products].sort((a, b) => a.id - b.id));
      setPage(1);
      setIsLastPage(false);
    } else {
      setFilteredProducts([...products].filter((p) => p.category === category).sort((a, b) => a.id - b.id));
      setCurrProducts([...products].filter((p) => p.category === category).sort((a, b) => a.id - b.id).slice(0, numPerPage));
      setPage(1);
      setIsLastPage(false);
    }
  }


  return (
    <>
    <div className="selector-container">
    <select className="category-selector" onChange={(e) => filterProducts(e.target.value)}>
      <option value="all">All</option>
      <option value="Pants">Pants</option>
      <option value="Shorts">Shorts</option>
      <option value="T-Shirts">T-Shirts</option>
      <option value="Long Sleeve Shirts">Long Sleeve Shirts</option>
      <option value="Tank Tops">Tank Tops</option>
      <option value="Sweatshirts">Sweatshirts</option>
      <option value="Jackets">Category 7</option>
      <option value="Hats">Category 8</option>
      <option value="Dresses">Category 9</option>
      <option value="Socks">Category 10</option>
    </select>
    </div>
    <span className="pagination-buttons">
      <button className={page==1 && "inactive"} onClick={()=>paginate("prev")}>Previous</button>
      <button className={isLastPage && "inactive"} onClick={()=>paginate("next")}>Next</button>
    </span>
    <p className="pageNum">{page} of {Math.ceil(filteredProducts.length / numPerPage)}</p>
    <div className="products-container">
      {currProducts.map((p) => {

        return <Product product={p} key={`Product: ${p.id}`} />;
      })}
    </div>
    <span className="pagination-buttons">
      <button className={page==1 && "inactive"} onClick={()=>paginate("prev")}>Previous</button>
      <button className={isLastPage && "inactive"} onClick={()=>paginate("next")}>Next</button>
    </span>
    </>
  );
};

export default Products;
