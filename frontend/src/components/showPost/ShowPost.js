import { React, useContext, useEffect, useState } from "react";
import "./ShowPost.css";
import "../writePost/write.css";
import Image from "../../assets/Image.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";
const Home = () => {
  const Locations = useLocation();
  const path = Locations.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const PF = "http://localhost:4000/images/";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const aboutAuthor = "I fille very happy to share this article with you";

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const handleUpdate = async (e) => {
    console.log(post);
    try {
      console.log(post._id);
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
      window.location.reload();
    } catch (e) {}
  };
  return (
    <div className="home">
      <div className="heading">
        {updateMode ? (
          <input
            type="text"
            placeholder="Title"
            className="heading1"
            style={{ marginLeft: "20%" }}
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <p className="heading2">{post.title}</p>
        )}

        <h3
          style={{
            textAlign: "right",
            paddingRight: "5rem",
            fontStyle: "italic",
          }}
        >
          By: <b>{post.username}</b>
        </h3>
        <h3
          style={{
            textAlign: "right",
            paddingRight: "5rem",
            fontStyle: "italic",
          }}
        >
          <b>{new Date(post.createdAt).toDateString()}</b>
        </h3>
        <hr />
        {post.photo && (
          <img
            src={PF + post.photo}
            alt="Image is not available"
            style={{
              alignItems: "center",
              paddingLeft: ".5rem",
              paddingRight: "5rem",
              width: "20%",
              float: "right",
              borderRadius: "10rem",
            }}
          />
        )}
      </div>
      {updateMode ? (
        <div className="writeFormGroup">
          <textarea
            placeholder="Description"
            type="text"
            className="writeInput writeText"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <div className="contant">
          <p>{post.desc}</p>
        </div>
      )}
      <hr />
      <div className="author-container">
        <h4>{aboutAuthor}</h4>
      </div>
      {updateMode ? (
        <div className="edit">
          <button
            className="editButton"
            style={{ marginLeft: "3rem" }}
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      ) : (
        <>
          {post.username === user?.username && (
            <div className="edit">
              <button
                className="editButton"
                onClick={() => setUpdateMode(true)}
              >
                Edit
              </button>
              <button className="editButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
