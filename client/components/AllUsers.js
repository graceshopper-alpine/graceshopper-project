import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllUsers } from "../store/adminUsersSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersSlice.allUsers);
  const isAdmin = useSelector((state) => state.main.isAdmin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, isAdmin]);

  const handleClick = (id) => {
    window.location = `/users/${id}`;
  };

  if (users.length > 0) {
    return (
      <div className="user-list">
        <h1 className="fancy-font"> All users:</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Sessions</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user.id} onClick={() => handleClick(user.id)}>
                  <td>{user.username}</td>
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
