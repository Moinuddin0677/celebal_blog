import { React, useContext } from "react";
import SeePost from "./components/showPost/ShowPost";
import NavBar from "./components/Navbar/Nav";
import Posts from "./components/Posts/Posts";
import SignUp from "./components/SignUp/SignUp";
import Write from "./components/writePost/Write";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";

const App = () => {
  const { user } = useContext(Context);
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Posts />} />
          <Route path="/SeePost/*" element={<SeePost />} />
          <Route path="/write" element={<Write />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

// <Posts />
