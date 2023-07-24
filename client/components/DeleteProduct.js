import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const DeleteProductPage = () => {
  const { productId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);

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
