import React from "react";
import { Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./auth/AuthContext";
// import { AuthContext } from "../context/authContext.js";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Single from "./pages/Single";
import MusicPosts from "./pages/MusicPosts";
import BaseballPosts from "./pages/BaseballPosts";
import TechnologyPosts from "./pages/TechnologyPosts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import axios from "axios";
import "./pages/style.scss";


// Include credential with every request by default 
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8080';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar/>
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <div className="container">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:uid/" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/Technology" element={<TechnologyPosts />} />  
            <Route path="/baseball" element={<BaseballPosts />} />  
            <Route path="/music" element={<MusicPosts />} /> 
          </Routes>
        </Layout>
      </div>
    </div>
  );
}

export default App;
