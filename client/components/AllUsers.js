import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllUsers } from "../store/adminUsersSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice.allUsers);
  const isAdmin = useSelector((state) => state.main.isAdmin);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [currUsers, setCurrUsers] = useState([]);
  const numPerPage = 20;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, isAdmin]);

  const handleClick = (id) => {
    window.location = `/users/${id}`;
  };

  let sortedUsers

  useEffect(() => {
    if (users && users.length >0 ) {
      setCurrUsers([...users].slice((page-1)*numPerPage, page*numPerPage)) 
    } else {
      setCurrUsers([]);}

  },[users, page])

  let [currSort, setCurrSort] = useState('');



  const sortUsers = (type) => {
    if (type == 'sessions') {
      if (currSort == 'session-asc'){
        sortedUsers = [...users].sort((a, b) => a.sessions.length - b.sessions.length);
        setCurrSort('session-desc');
      } else {
        sortedUsers = [...users].sort((a, b) => b.sessions.length - a.sessions.length);
        setCurrSort('session-asc');
      }
    }
    if (type == 'orders') {
      if (currSort == 'order-asc'){
        sortedUsers = [...users].sort((a, b) => a.sessions.reduce(
          (total, session) => total + session.orders.length, 0) - b.sessions.reduce(
            (total, session) => total + session.orders.length, 0));
        setCurrSort('order-desc');
      } else {
        sortedUsers = [...users].sort((a, b) => b.sessions.reduce(
          (total, session) => total + session.orders.length, 0) - a.sessions.reduce(
            (total, session) => total + session.orders.length, 0));
        setCurrSort('order-asc');
      }
    }
    dispatch({
      type: "users/setUsers",
      payload: sortedUsers
    })
  }

  const paginate = (type) => {
    if (type == "prev") {
      if (page > 1) {
        setPage(page - 1);
        setIsLastPage(false);
      }
    } else if (type == "next") {
      if (page < Math.ceil(users.length / numPerPage)) {
        let newPage = page + 1;
        setPage(page + 1);
        if (newPage == Math.ceil(users.length / numPerPage)) {
          setIsLastPage(true);
        }
      }
    }
  }

  if (currUsers.length > 0) {
    return (
      <div className="user-list">
        <h1 className="fancy-font"> All users:</h1>
        <span className="pagination-buttons">
          <button className={page==1 && "inactive"}onClick={()=>paginate("prev")}>Previous</button>
          <p>{page} of {Math.ceil(users.length / numPerPage)}</p>
          <button className={isLastPage && "inactive"} onClick={()=>paginate("next")}>Next</button>          
        </span>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th onClick={()=>sortUsers('sessions')}>Sessions</th>
              <th onClick={()=>sortUsers('orders')}>Orders</th>
            </tr>
          </thead>
          <tbody>
            {currUsers.map((user) => {
              return (
                <tr key={user.id} onClick={() => handleClick(user.id)}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.sessions.length}</td>
                  <td>
                    {user.sessions.reduce(
                      (total, session) => total + session.orders.length,
                      0
                    )}
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

export default UserList;
