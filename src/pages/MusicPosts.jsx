import React, { useEffect, useState } from "react";
import axios from "axios";

const MusicPosts = () => {
  const [musicPosts, setMusicPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/posts?cat=music");
        setMusicPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Music Posts</h2>
      {/* Render the music posts */}
      {musicPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MusicPosts;
