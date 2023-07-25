import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../store/adminUserSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.user);
  const isAdmin = useSelector((state) => state.main.isAdmin);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, isAdmin]);

  if (user.sessions) {
    return (
      <div className="user-container">
        <h1 className="fancy-font">User: {user.username}</h1>

        <h2>Sessions</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Resulted in Order?</th>
            </tr>
          </thead>
          <tbody>
            {user.sessions.map((session) => {
              return (
                <tr key={session.id}>
                  <td>{session.id}</td>
                  <td>{session.createdAt}</td>
                  <td>{session.orders.length > 0 ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Status</th>
              <th>Date</th>
              <th># Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {user.sessions
              .flatMap((session) => session.orders)
              .map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.order_items.length}</td>
                    <td>
                      {"$" +
                        order.order_items
                          .reduce(
                            (total, item) =>
                              total +
                              item.quantity *
                                parseFloat(item.product.price.replace("$", "")),
                            0
                          )
                          .toFixed(2)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <h2>Order Items</h2>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {user.sessions
              .flatMap((session) => session.orders)
              .flatMap((order) => order.order_items)
              .map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <Link to={`/products/${item.product.id}`}>
                        {item.product.name}
                      </Link>
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {"$" +
                        (
                          item.quantity *
                          parseFloat(item.product.price.replace("$", ""))
                        ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <h1 className="fancy-font"> Nothing to see here.</h1>;
  }
};

export default User;
