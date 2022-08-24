import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Nav() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [logot, setlot] = useState(false);
  const { user, dispatch } = useContext(Context);
  const H = "15rem";
  const T = "8rem";
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
    {
      logot ? setlot(false) : setlot(true);
    }
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const handleLogout = () => {
    console.log("Handle Logout");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <nav>
        <img src={logo} alt="Somthing went wrong" className="logo" />
        {(toggleMenu || screenWidth > 800) && (
          <ul className="list">
            <li className="items">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li className="items">
              <Link to="/write" className="link">
                Write Your Post
              </Link>
            </li>
            <li className="items">
              {!user && (
                <li>
                  <Link to="/signup" className="link">
                    Sign In
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  {screenWidth > 800 && (
                    <span
                      style={{ marginRight: "2rem", color: "white" }}
                      className="hii"
                    >
                      Hii {user.username}
                    </span>
                  )}
                  <span onClick={handleLogout} className="link">
                    Log Out
                  </span>
                </li>
              )}
            </li>
          </ul>
        )}
        {toggleMenu ? (
          <div>
            {user && <span className="btnuse">Hii {user.username}</span>}
            <button onClick={toggleNav} className="btn">
              <IoMdClose />
            </button>
          </div>
        ) : (
          <div>
            {user && <span className="btnuse">Hii {user.username}</span>}
            <button onClick={toggleNav} className="btn">
              <FiMenu />
            </button>
          </div>
        )}
      </nav>
      {logot === true ? (
        <div style={{ height: H }}></div>
      ) : (
        <div style={{ height: T }}></div>
      )}
    </div>
  );
}
