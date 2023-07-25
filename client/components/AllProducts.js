import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  let products = useSelector((state) => state.productsSlice.allProducts); // select data from redux store
  const [currProducts, setCurrProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const numPerPage = 15;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setCurrProducts([...products].sort((a, b) => a.id - b.id).slice(0, numPerPage));
    setFilteredProducts([...products].sort((a, b) => a.id - b.id));
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
      if (page < Math.ceil(products.length / numPerPage)) {
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
      <option value="Accessories">Category 1</option>
      <option value="Mens">Category 2</option>
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
