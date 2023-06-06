import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify';
import { useContext } from "react";
import { AuthContext } from "../context/authContext";



// const baseUrl = "http://127.0.0.1:8080"

const baseUrl = "https://blog-api-capstone.herokuapp.com/"


const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // console.log('category', cat)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/posts${cat}`);
        // console.log(res.data)
        setPosts(res.data);
      } catch (error) {
        console.log('home error: ', error);
      }
    };
    fetchData();
  }, [cat]);

  const handleClick = (post) => {
    // Check if the user is logged in
    // const isLoggedIn = login();

    // if (isLoggedIn) {
    // User is logged in, proceed to the post details page
    navigate(`/post/${post.id}`);
    // } else {
    // User is not logged in, redirect to the login page or a dedicated "login required" page
    // navigate("/login-required");
    // }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`/uploads/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* <p>{getText(post.content)}</p> */}
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content),
                }}
              ></p>
              <Link className="link" to={`/post/${post.id}`} onClick={() => handleClick(post)}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
