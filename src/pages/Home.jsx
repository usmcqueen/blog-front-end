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

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem Ipsum Dolor",
  //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur eleifend elit, sed accumsan lorem lobortis eu. Sed vel lobortis quam.",
  //     img: "https://dummyimage.com/300x200/000/fff&text=Image+1",
      // img: <img src={`../upload/img/abstractwater.jpg${post.img}`} alt="water" />
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem Ipsum Sit",
  //     desc: "Lorem ipsum sit amet, consectetur adipiscing elit. Maecenas sed faucibus orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  // img: "https://dummyimage.com/300x200/000/fff&text=Image+2",
  //   },
  //   {
  //     id: 3,
  //     title: "Ipsum Dolor Amet",
  //     desc: "Ipsum dolor amet sit amet, consectetur adipiscing elit. Sed id odio eu risus eleifend tincidunt vel et tellus. Nullam euismod auctor metus, sed bibendum arcu.",
  //     img: "https://dummyimage.com/300x200/000/fff&text=Image+3",
  //   },
  //   {
  //     id: 4,
  //     title: "Dolor Ipsum Sit",
  //     desc: "Dolor ipsum sit amet, consectetur adipiscing elit. In malesuada, nulla ac suscipit rhoncus, libero est placerat ex, sit amet cursus justo turpis nec tortor.",
  //     img: "https://dummyimage.com/300x200/000/fff&text=Image+4",
  //   },
  //   {
  //     id: 5,
  //     title: "Ipsum Consectetur",
  //     desc: "Ipsum consectetur adipiscing elit. Curabitur sollicitudin tincidunt est. Donec ullamcorper libero elit, at commodo massa consectetur non.",
  //     img: "https://dummyimage.com/300x200/000/fff&text=Image+5",
  //   },
  //   {
  //     id: 6,
  //     title: "Consectetur Adipiscing",
  //     desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     img: "https://dummyimage.com/300x200/000/fff&text=Image+6",
  //   },
  // ];


  const getText = (html) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../../public/uploads/${post?.img}`} alt="not showing" />
             {/* <img src={`http://localhost:3000/public/uploads/1684988964737bluefiary.jpeg`} alt="not showing" /> */}
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
