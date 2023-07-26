import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { deleteProduct } from "../store/singleProductSlice";
import axios from "axios";

const DeleteProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.singleProductSlice.singleProduct);

  // useEffect(() => {
  //   fetchProductDetails(productId).then((data) => setProduct(data));
  // }, [productId]);

  const handleDelete = async () => {
  
      event.preventDefault();
      
      //create the product in the db
      let newproduct = await axios.delete(`/api/admin/products/${productId}/deleteproduct`,
      {
        headers: {
          "Authorization": `${localStorage.getItem("token")}`
        },
      }
      );
      //if the product is deleted successfully
      if (newproduct.id) {
      window.location= "/products?toast=product-deleted"
      }


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