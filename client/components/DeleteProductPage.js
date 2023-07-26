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
      let deleteStatus = await axios.delete(`/api/admin/products/${product.id}/deleteproduct`,
      {
        headers: {
          "Authorization": `${localStorage.getItem("token")}`
        },
      }
      );
      //if the product is deleted successfully

      console.log("deleteStatus", deleteStatus);

      if (deleteStatus.status == 204) {
      window.location= "/products?toast=product-deleted"
      }


  };

  const handleCancel = () => {
    history.push("/products");
  };

  return (
    <div className="delete-product-container">
      {product ? (
        <div>
          <h2 className="fancy-font">Delete Product</h2>
          <p>Product Name: {product.name}</p>
          <img src={product.image_url} alt={product.name} />
          <p>Are you sure? Deleting a product can not be undone.</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeleteProductPage;