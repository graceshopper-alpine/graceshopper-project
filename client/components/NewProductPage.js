import React, { useState } from "react";

const NewProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
    category: "",
    quantity: "",
    
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewProduct(productData));
    history.push("/products");
  };

  return (
    <div>
      <h2>Add New Product</h2>
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
        
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default NewProductPage;
