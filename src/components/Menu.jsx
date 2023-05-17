import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ( {cat}) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    }, [cat]);


    //   {
    //     id: 1,
    //     title: "Lorem Ipsum Dolor",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur eleifend elit, sed accumsan lorem lobortis eu. Sed vel lobortis quam.",
    //     img: "https://dummyimage.com/300x200/000/fff&text=Image+1",
    //   },
    //   {
    //     id: 2,
    //     title: "Lorem Ipsum Sit",
    //     desc: "Lorem ipsum sit amet, consectetur adipiscing elit. Maecenas sed faucibus orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    //     img: "https://dummyimage.com/300x200/000/fff&text=Image+2",
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

    return (
      <div className="menu">
        <h1> Other posts you may like </h1>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2>{post.title}</h2>
            <button> Read More </button>
          </div>
        ))}
      </div>
    );
  };

export default Menu;
