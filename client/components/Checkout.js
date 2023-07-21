import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { canTreatArrayAsAnd } from "sequelize/types/utils";
import Cart from "./Cart";
import Product from "./Product";

const Checkout = () => {
  return (
    <>
      <div>
        <div className="check-container">
          <h5>Checkout</h5>
        </div>
      </div>
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
          <label>Full Address</label>
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
      <div>
        <div>
          <button type="button">Place Order</button>
        </div>
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
            <tr>
                <td>{Cart.Product}</td>
                <td>{Cart.Product.price}</td>
                <td>{Cart.quantity}</td>
                <td>{Cart.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Checkout;
