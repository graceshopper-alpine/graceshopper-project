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
      <div className="fancy-font-checkout">
        <div>
          <h1 className="fancy-font-checkout">Checkout</h1>
        </div>
      </div>

      <div className="item-container">
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

      <div className="total-info">
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>


      <div className="checkout-container">
        <div>
          <div>
            <label className="checkout-label">First Name</label>
            <input
              className="checkout-input"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">Last Name</label>
            <input
              className="checkout-input"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">Email Address</label>
            <input
              className="checkout-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">Street Address</label>
            <textarea
              className="checkout-label-address"
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">City</label>
            <input
              className="checkout-input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">State</label>
            <input
              className="checkout-input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="checkout-label">Zip Code</label>
            <input
              className="checkout-input"
              type="text"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div></div>
      </div>

      

      <div className="payment-container">
        <div>
          <div>
            <label className="payment-label">Card Number</label>
            <input
              className="payment-input"
              type="text"
              name="card-number"
              value="xxxx-xxxx-xxxx-xxxx"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="payment-label">Expiration</label>
            <input
              className="payment-input"
              type="text"
              name="expiration"
              value="xx/xx"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <div>
            <label className="payment-label">Security Code</label>
            <input
              className="payment-input"
              type="text"
              name="security-code"
              value="xxx"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="openModal" onClick={handlePlaceOrder}>
          Place Order
        </button>
        {openModal && <Modal continueModal={() => setOpenModal(false)} />}
      </div>
    </div>
  );
};

export default Checkout;
