import React from "react";
import "./Post.css";

import { Link } from "react-router-dom";

const Post = ({ props }) => {
  const PF = "http://localhost:4000/images/";
  return (
    <div className="post">
      <div className="logocname">
        <img
          src={PF + props.photo}
          alt="Image is not available"
          className="postImg"
        />
        <div className="postInfo">
          <hr />
          <Link to={`/SeePost/${props._id}`}>
            <span className="postTitle postCat">{props.title}</span>
          </Link>

          <div>
            <span>
              <b className="postDis">By: {props.username}</b>
            </span>

            <span className="postDate">
              {new Date(props.createdAt).toDateString()}
            </span>
          </div>
          <hr />
        </div>
      </div>

      <p className="postDis">{props.desc}</p>
    </div>
  );
};

export default Post;
