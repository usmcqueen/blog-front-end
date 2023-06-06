import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Menu = ({ cat }) => {
  // console.log('menu cat: ', cat)
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const handleReadMore = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="menu">
      <h1> Other posts you may like </h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`/uploads/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button onClick={() =>
            handleReadMore(post.id)}
          > Read More </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
