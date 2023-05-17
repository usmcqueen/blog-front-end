import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import MusicPosts from "./pages/MusicPosts";
import DisneyPosts from "./pages/DisneyPosts";
import BaseballPosts from "./pages/BaseballPosts";
import FoodPosts from "./pages/FoodPosts";
import SciencePosts from "./pages/SciencePosts";
import TechnologyPosts from "./pages/TechnologyPosts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./pages/style.scss";
// import postRoutes from "./posts.js";
// import postRoutes from "./routes/posts.js";

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
  return(
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:uid/" element={<Single />} />
          <Route path="/write" element={<Write />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/food" element={<FoodPosts />} />  
          <Route path="/technology" element={<TechnologyPosts />} />  
          <Route path="/science" element={<SciencePosts />} />  
          <Route path="/disney" element={<DisneyPosts />} />  
          <Route path="/baseball" element={<BaseballPosts />} />  
          <Route path="/music" element={<MusicPosts />} /> 
      </Routes>
    </Layout>
  );
};

export default App;
