import { React, useState, useContext, useRef } from "react";
import logo from "../../assets/logo.png";
import "./SignUp.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

const SignUp = () => {
  var signButtonText = "";
  var rigisterback = "";
  const [state, setState] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);
  const [home, setHome] = useState(false);

  {
    state === 0
      ? (signButtonText = "Sign In")
      : state === 2
      ? (signButtonText = "Send")
      : (signButtonText = "I Agree");
  }
  {
    state === 2
      ? (rigisterback = "Back to Sign In")
      : (rigisterback = "Already Registered");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    console.log({ password, email });
    try {
      if (state === 1) {
        const res = await axios.post("/auth/register", {
          username,
          password,
          email,
        });
        console.log(`Registered`);
        setState(0);
      }
      //  else {
      //   console.log("Login");
      // }
    } catch (err) {
      setError(true);
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setHome(true);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div>
      <div className="signpannel">
        {state === 0 ? (
          <h1>welcome back!</h1>
        ) : (
          <>
            {state === 2 ? (
              <h1>Send Password to Your Email</h1>
            ) : (
              <h1>Sign up to get started</h1>
            )}
          </>
        )}

        <form onSubmit={state == 1 ? handleSubmit : handleSubmit1}>
          {state === 2 ? (
            <>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
            </>
          ) : (
            <>
              {state === 1 ? (
                <>
                  <label>Name</label>
                  <input
                    type="username"
                    placeholder="Enter Your Name"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br />
                </>
              ) : (
                <></>
              )}
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
            </>
          )}
          {home ? (
            <Link to="/">
              <button type="submit" className="button">
                {signButtonText}
              </button>
            </Link>
          ) : (
            <button type="submit" className="button">
              {signButtonText}
            </button>
          )}
        </form>
        <br />
        {error && <span>User is Already Registered</span>}
        {state === 0 ? (
          <div className="registerButton">
            <button onClick={() => setState(1)}>New User? </button>
            <div
              style={{
                width: "1rem",
                height: "auto",
                display: "inline-block",
              }}
            ></div>
            <button onClick={() => setState(2)}>Forget Password</button>
          </div>
        ) : (
          <div className="registerButton">
            <button
              onClick={() => {
                setState(0);
                setError(false);
              }}
            >
              {rigisterback}
            </button>
          </div>
        )}
        <br />
        {state === 0 ? (
          <h5>
            By signing in, you agree to our Terms Of Use and Privacy Policy In
            addition, you also agree to receive email messages from us about
            your experience with our service, and features you can use.
          </h5>
        ) : state !== 2 ? (
          <h5>
            By clicking "I Agree" you agree to our Terms Of Use and Privacy
            Policy In addition, you also agree to receive email messages from us
            about your experience with our service, and features you can use.
          </h5>
        ) : (
          <h5></h5>
        )}
      </div>
    </div>
  );
};

export default SignUp;
