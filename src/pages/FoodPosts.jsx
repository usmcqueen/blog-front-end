import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodPosts = () => {
  const [foodPosts, setFoodPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts?cat=food");
        console.log(response)
        setFoodPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Food Posts</h2>
      {/* Render the food posts */}
      {foodPosts.map((post) =>  (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}

    </div>
  )
}
export default FoodPosts;
