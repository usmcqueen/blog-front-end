import React, { useEffect, useState } from "react";
import axios from "axios";

const TechnologyPosts = () => {
  const [TechnologyPosts, setTechnologyPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/posts?cat=Technology");
        setTechnologyPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Technology Posts</h2>
      {TechnologyPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TechnologyPosts;
