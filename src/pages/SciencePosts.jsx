import React, { useEffect, useState } from "react";
import axios from "axios";

const SciencePosts = () => {
  const [sciencePosts, setSciencePosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts?cat=science");
        setSciencePosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Science Posts</h2>
      {/* Render the science posts */}
      {sciencePosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default SciencePosts;
