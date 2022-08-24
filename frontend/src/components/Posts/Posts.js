import { React, useState, useEffect } from "react";
import "./Posts.css";
import Card from "../Post/Post";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="posts">
      {posts.map((p) => (
        <Card props={p} />
      ))}
    </div>
  );
};

export default Posts;
