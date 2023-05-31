import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  // console.log(location)
  // console.log(state);
  const [title, setTitle] = useState(state?.title || ""); 
  const [content, setContent] = useState(state?.content || ""); 
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || ""); 

  const navigate = useNavigate();
  // const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8080/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    // console.log(imgUrl);

    try {
      let res;

      if (state) {
        res = await axios.put(`http://localhost:8080/api/posts/${state.id}`, {
          title: title,
          content: content,
          cat: cat,
          img: file ? imgUrl : null,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      } else {
        res = await axios.post(`http://localhost:8080/api/posts/`, {
          title: title,
          content: content,
          cat: cat,
          img: file ? imgUrl : null,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      console.log(res.data);
      // navigate(`/category/${cat}`); 
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Staus:</b>Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            {" "}
            Upload Image{" "}
          </label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button onClick={handleClick}> Publish </button>
          </div>
        </div>

        <div className="item">
          <h1> Category </h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "Music"}
              name="cat"
              value="Music"
              id="Music"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Music">Music </label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "Baseball"}
              name="cat"
              value="Baseball"
              id="Baseball"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="baseball">Baseball</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              checked={cat === "Technology"}
              name="cat"
              value="Technology"
              id="Technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="Technology">Technology</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
