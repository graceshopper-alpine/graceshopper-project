import React, { useEffect, useState } from "react";
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
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [emailField, setEmailField] = useState(user.email);
  const [phoneField, setPhoneField] = useState(user.phone);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, isAdmin]);

  useEffect(() => {
    setEmailField(user.email);
  }, [user.email]);

  useEffect(() => {
    setPhoneField(user.phone);
  }, [user.phone]);

  const toggleEdit = async (type) => {
    
    if (type === "email") {
      if (!editEmail) {
        setEditEmail(true);
      } else {
        try {
          await axios.put(`/api/users/${id}`, {
            email: emailField,
            phone: user.phone
          },
            {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            });
            dispatch(getUser(id))
            setEditEmail(false);
        } catch (err) {
          if (err.response && err.response.data) {
            console.log(err.response.data);
          } else {
            console.log(err);
          }
        }
      }
    }
    
    if (type === "phone") {
      if (!editPhone) {
        setEditPhone(true);
      } else {
        try {
          await axios.put(`/api/users/${id}`, {
            email: user.email,
            phone: phoneField},
            {
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            });
            dispatch(getUser(id))
            setEditPhone(false);
      } catch (err) {
        if (err.response && err.response.data) {
          console.log(err.response.data);
        } else {
          console.log(err);
        }
      }
    }
  }
  }


  const handleChange = (e) => {
    if(e.target.name === "email") {
      setEmailField(e.target.value);
    }
    if(e.target.name === "phone") {
      setPhoneField(e.target.value);
    }
  }

  if (user.sessions) {
    return (
      <div className="user-container">
        <h1 className="fancy-font">User: {user.username}</h1>

        <h2>Contact Details</h2>
        <span>
          <b>Email:</b> {editEmail ? <input name="email" type="email" pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$" value={emailField} onChange={handleChange}></input> : user.email}
          <a onClick={()=>toggleEdit('email')}>{editEmail ? "Save" : "Edit"}</a>
        </span>
        
        <span>
          <b>Phone:</b> {editPhone ? <input name="phone" type="tel" pattern="^\(?\d{3}\)?[\- ]?\d{3}[\- ]?\d{4}$" value={phoneField} onChange={handleChange}></input> : user.phone}
          <a onClick={()=>toggleEdit('phone')}>{editPhone ? "Save" : "Edit"}</a>
        </span>

       {isAdmin && 
       <>
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
        </>}

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
