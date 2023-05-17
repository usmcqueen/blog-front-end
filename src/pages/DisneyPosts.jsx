import React, { useEffect, useState } from "react";
import axios from "axios";

const DisneyPosts = () => {
  const [disneyPosts, setDisneyPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts?cat=disney");
        setDisneyPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Disney Posts</h2>
      {/* Render the disney posts */}
      {disneyPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default DisneyPosts; 
