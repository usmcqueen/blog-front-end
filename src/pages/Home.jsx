import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import DOMPurify from 'dompurify';
// import myImage from '../../public/uploads/1684988964737bluefiary.jpeg'

const baseUrl = "http://localhost:8080"

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;
  // console.log('category', cat)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/posts${cat}`);
        console.log(res.data)
        setPosts(res.data);
      } catch (error) {
        console.log('home error: ', error);
      }
    };
    fetchData();
  }, [cat]);


  const getText = (html) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`/uploads/${post.img}`} alt="not showing" />
              {/* <img src={`http://localhost:3000/public/uploads/1684988964737bluefiary.jpeg`} alt="hard code" /> */}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content)}</p>
              <Link className="link" to={`/post/${post.id}`}>
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
