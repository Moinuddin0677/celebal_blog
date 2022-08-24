import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/SeePost/" + res.data._id);
    } catch (err) {}
  };
  const handleOnClick = () => {
    window.location.replace("/signup");
  };

  return (
    <div className="write">
      {user ? (
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGrop">
            <input
              type="text"
              placeholder="Title"
              className="heading1"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr />

            <div className="imagesection">
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                className="imageupload"
              />
              <br />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Image Not available"
                  className="imageuploaded"
                />
              )}
            </div>

            <br />
            <div className="writeFormGroup">
              <textarea
                placeholder="Description"
                type="text"
                className="writeInput writeText"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <hr />

              <hr />
              <button type="submit" className="writeSubmit">
                Post
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="youneed">
          <h3>You need to login first</h3>
          <button onClick={handleOnClick} className="button">
            Go to signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Write;
