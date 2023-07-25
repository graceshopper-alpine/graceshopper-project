import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { deleteProduct } from "../store/singleProductSlice";

const DeleteProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector

  useEffect(() => {
    fetchProductDetails(productId).then((data) => setProduct(data));
  }, [productId]);

  const handleDelete = () => {
    dispatch(deleteProduct(productId));
    // after successfully deleting, navigate back to the products page
    history.push("/products");
  };

  const handleCancel = () => {
    history.push("/products");
  };

  return (
    <div>
      {product ? (
        <div>
          <h2>Delete Product</h2>
          <p>Product Name: {product.name}</p>
          <img src={product.image} alt={product.name} />
          <p>Delete this product, are you sure?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleCancel}>No</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeleteProductPage;
