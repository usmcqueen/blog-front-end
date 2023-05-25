import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
// import { formatDistanceToNow } from "date-fns";
import moment from "moment";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
// import DOMPurify from "dompurify";


const Single = () => {

  const [post, setPost] = useState({});
  // const [postId, setPostId] = useState('')
  const location = useLocation();
  const uid = useParams().uid
  // setPostId(uid)
  const navigate = useNavigate();

  // const postId = location.pathname.split("/")[2];

  // const { userId, id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const fileInput = useRef(null); // Define fileInput using useRef

  // console.log('postid: ', postId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${uid}`);
        console.log('single post: ', res.data)
        setPost(res.data);
      } catch (err) {
        // console.log('Post:', response.data);\
        console.log('single get error: ', err)
      }
    };
    fetchData();
  }, [uid]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${uid}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const handleSubmit = async () => {
    try {
      // Update the form data with the new values
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("cat", post.cat);
      formData.append("img", fileInput.current.files[0]);

      // Make the POST request to update the post
      await axios.post(`/posts/${uid}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  };

  // const formattedDate = new Date(post.date);
  // const distanceToNow = formatDistanceToNow(formattedDate, { addSuffix: true, includeSeconds: true });


  //   try {
  //     await fetch("/addPost", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     // Handle the response from the server
  //   } catch (error) {
  //     // Handle any errors
  //     console.error(error);
  //   }
  // };

  return (
    <div className="single">
      <div className="content">
        <img src={`../../public/uploads/${post?.img}`} alt="" />

        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{currentUser.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>
          {getText(post.content)}
        </p>
      </div>
      <Menu cat={post.cat} />

      {/* Form for creating a new post */}
      <form onSubmit={handleSubmit}>
        <input type="file" id="fileInput" ref={fileInput} />
        <button type="submit"> Submit </button>
      </form>

    </div>
  );
};

export default Single;
