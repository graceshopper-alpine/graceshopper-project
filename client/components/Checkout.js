import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.main.cart);

  return (
    <>
      <div>
        <div>
          <h1 className="fancy-font">Checkout</h1>
        </div>
      </div>
      <div className="checkout-container">
        <div>
          <div>
            <label>First Name</label>
            <input type="text" name="firstname"></input>
          </div>
        </div>
        <div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastname"></input>
          </div>
        </div>
        <div>
          <div>
            <label>Email Address</label>
            <input type="text" name="email"></input>
          </div>
        </div>
        <div>
          <div>
            <label>Street Address</label>
            <textarea rows="3"></textarea>
          </div>
        </div>
        <div>
          <div>
            <label>City</label>
            <input type="text" name="city"></input>
          </div>
        </div>
        <div>
          <div>
            <label>State</label>
            <input type="text" name="state"></input>
          </div>
        </div>
        <div>
          <div>
            <label>Zip Code</label>
            <input type="text" name="zipcode"></input>
          </div>
        </div>
      </div>
      <div></div>

      <div className="checkout-summary">
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
            <tr>
              <td>{cart.product}</td>
              <td>{cart.Product}</td>
              <td>{cart.quantity}</td>
              <td>{cart.total}</td>
              <div>
                <button type="button">Place Order</button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Checkout;
