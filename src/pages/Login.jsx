import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// import "./style.scss";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  
  })

  const [error, setError] = useState(null);
  // console.log(inputs.username);
 

  const navigate = useNavigate();
  // console.log(inputs);

  const { login } = useContext(AuthContext);
  // console.log(inputs);

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
        {/* <div className="container"> */}
        <form>
          <input 
          required
          type="text" 
          placeholder="username" 
          name="username" 
          onChange={handleChange} />
          <input 
          required
          type="password" 
          placeholder="password" 
          name="password" 
          onChange={handleChange} />
          <button onClick={handleSubmit}>Login</button>
          {error && <p>{error}</p>}
          <span>
            Need an account? <Link to="/register">Register</Link>
          </span>
        </form>
      {/* </div> */}
    </div>
  );
};

export default Login;
