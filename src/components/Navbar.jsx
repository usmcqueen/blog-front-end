import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/ship.jpeg";


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="/" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=music">
            <h6>Music</h6>
          </Link>
          <Link className="link" to="/?cat=baseball">
            <h6>Baseball</h6>
          </Link>
          <Link className="link" to="/?cat=Technology">
            <h6>Technology</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
