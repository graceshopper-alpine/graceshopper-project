import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {fetchSingleProduct} from './singleProductSlice'

const EditProductPage = () => {
  const { productId } = useParams(); // Get the productId from the URL parameter
  const dispatch = useDispatch();
  const history = useHistory();
  const productData = useSelector((state) => state.singleProduct.singleProduct);

  useEffect(() => {
    fetchProductDetails(productId).then((data) => setProductData(data));
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: 'singleProduct/updateProductData',
      payload: { ...productData, [name]: value },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProduct(productId, productData));
    history.push("/products");
  };

  return (
        <div>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image:
              <input
                type="text"
                name="image_url"
                value={productData.image_url}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
                required
              />
            </label>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProductPage;
