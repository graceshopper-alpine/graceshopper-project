import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Navbar = ({ handleClick, isLoggedIn }) => {
  
  
  const cart = useSelector((state) => state.main.cart);

  return (
  <div>
    <nav>
    
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/products"><h2>Grace Shopper</h2></Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">{cart.length>0 ? `Cart (${cart.length})` : `Cart`}</Link>
          <Link to="/users">Users</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <h2>Grace Shopper</h2>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
