import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import moment from "moment";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import DOMPurify from "dompurify";

const Single = () => {

  const [post, setPost] = useState({});
  const location = useLocation();
  const uid = useParams().uid
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  // const { userId, id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const fileInput = useRef(null);

  // console.log('postid: ', postId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`api/posts/${uid}`);
        // console.log('single post: ', res.data)
        setPost(res.data);
      } catch (err) {
        // console.log('Post:', response.data);\
        console.log('single get error: ', err)
      }
    };
    fetchData();
  }, [uid]);


  const handleDelete = (req, res) => {
    axios
      .delete(`api/posts/${uid}`)
      .then(res => {
        console.log(res.data);
        navigate("/");
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("content", post.content);
      formData.append("cat", post.cat);
      formData.append("img", fileInput.current.files[0]);

      await axios.post(`/posts/${uid}`, formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <div className="single">
      <div className="content">
        <img src={`/uploads/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>

      </div>
      <Menu cat={post.cat} />

    </div>
  );
};

export default Single;

