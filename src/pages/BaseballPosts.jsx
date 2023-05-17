import React, { useEffect, useState } from "react";
import axios from "axios";

const BaseballPosts = () => {
  const [baseballPosts, setBaseballPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts?cat=baseball");
        setBaseballPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Baseball Posts</h2>
      {/* Render the baseball posts */}
      {baseballPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BaseballPosts;
