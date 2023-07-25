import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const Checkout = () => {
  const cart = useSelector((state) => state.main.cart);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  // Calculate the total amount of the order
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) =>
        total +
        parseFloat(item.product.price.replace("$", "")) *
          parseInt(item.quantity),
      0
    );
  };

  return (
    <div>
      <div className="fancy-font">
        <div>
          <h1 className="fancy-font">Checkout</h1>
        </div>
      </div>
      <div className="checkout-container">
        <div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Email Address</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Full Address</label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div></div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={`CartItem:${item.id}`}>
                <td>{item.product.name}</td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>
                  {(
                    parseFloat(item.product.price.replace("$", "")) *
                    item.quantity
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
      <div>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Expiration</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <div>
          <label>Security Code</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <button className="openModal" onClick={handlePlaceOrder}>
          Place Order
        </button>
        {openModal && <Modal continueModal={() => setOpenModal(false)} />}
      </div>
    </div>
  );
};

export default Checkout;
