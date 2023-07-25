import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";
import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch(); // used to dispatch the action
  let products = useSelector((state) => state.productsSlice.allProducts); // select data from redux store
  const [currProducts, setCurrProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const numPerPage = 15;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setCurrProducts([...products].sort((a, b) => a.id - b.id).slice(0, numPerPage))
  }, [products]);

  const paginate = (type) => {
    if (type == "prev") {
      if (page > 1) {
        let newPage = page - 1;
        setCurrProducts([...products].sort((a, b) => a.id - b.id).slice((newPage-1)*numPerPage, (newPage)*numPerPage));
        setPage(page - 1);
        setIsLastPage(false);
      }
    } else if (type == "next") {
      if (page < Math.ceil(products.length / numPerPage)) {
        let newPage = page + 1;
        setCurrProducts([...products].sort((a, b) => a.id - b.id).slice((newPage-1)*numPerPage, (newPage)*numPerPage));
        setPage(page + 1);
        if (newPage == Math.ceil(products.length / numPerPage)) {
          setIsLastPage(true);
        }
      }
    }
  }


  return (
    <>
    <span className="pagination-buttons">
      {page!=1 && <button onClick={()=>paginate("prev")}>Previous</button>}
      {!isLastPage && <button onClick={()=>paginate("next")}>Next</button>}
    </span>
    <p className="pageNum">{page} of {Math.ceil(products.length / numPerPage)}</p>
    <div className="products-container">
      {currProducts.map((p) => {

        return <Product product={p} key={`Product: ${p.id}`} />;
      })}
    </div>
    <span className="pagination-buttons">
      {page!=1 && <button onClick={()=>paginate("prev")}>Previous</button>}
      {!isLastPage && <button onClick={()=>paginate("next")}>Next</button>}
    </span>
    </>
  );
};

export default Products;
