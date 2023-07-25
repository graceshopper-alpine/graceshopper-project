import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Fuse from 'fuse.js'


const Navbar = ({ handleClick, isLoggedIn }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.main.cart);
  const isAdmin = useSelector((state) => state.main.isAdmin);
  const sessionId = useSelector((state) => state.main.sessionId);
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.id);
  const [searchField, setSearchField] = useState("");

  const toggleAdmin = async () => {
    const { data } = await axios.post("/api/users/toggleAdmin", {
      sessionId,
    });
    dispatch({
      type: "main/setAdmin",
      payload: data.isAdmin,
    });
  };

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  }

  return (
    <div className="outer-nav-container">
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">
              <h2>Grace Shopper</h2>
            </Link>
            <Link to="/">Products</Link>
            <Link to="/cart">
              {cart.length > 0 ? `Cart (${cart.length})` : `Cart`}
            </Link>
            {isAdmin && <Link to="/users">Users</Link>}
            <a href="#" onClick={toggleAdmin}>
              Toggle Admin ({isAdmin ? "True" : "False"})
            </a>
            <Link to={`/users/${userId}`}>{username}</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <input onKeyDown={(e)=>{if(e.key === "Enter"){window.location = `/products?q=${encodeURI(searchField)}`}}} type="text" placeholder="Search" value={searchField} onChange={handleSearchChange}></input>
            <a onClick={()=>window.location = `/products?q=${encodeURI(searchField)}`}><i class="fa-solid fa-magnifying-glass"></i></a>
          </div>
        ) : (
          <div>
            <Link to="/">
              <h2>Grace Shopper</h2>
            </Link>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Products</Link>
            <Link to="/cart">
              {cart.length > 0 ? `Cart (${cart.length})` : `Cart`}
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <input onKeyDown={(e)=>{if(e.key === "Enter"){window.location = `/products?q=${encodeURI(searchField)}`}}} type="text" placeholder="Search" value={searchField} onChange={handleSearchChange}></input>
            <a onClick={()=>window.location = `/products?q=${encodeURI(searchField)}`}><i class="fa-solid fa-magnifying-glass"></i></a>
          </div>
        )}
      </nav>
    </div>
  );
};

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
