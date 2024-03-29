import React, { useState } from "react";
import "../styles/pages/home/home.css";
import { useAuth } from "../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Home = () => {
  const [email, setemail] = useState("");
  const { currentUser, signin } = useAuth();
  const navigate = useNavigate();

  // Submit User Email
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Pleace Write Your Email");
    } else {
      try {
        signin(email);
        setemail("");
      } catch (error) {
        toast.error("Something was wrong!");
      }
    }
  };

  if (currentUser) {
    navigate("/users");
  } else {
    return (
      <>
        <nav>
          <a href="/" className="logo">
            <img src="./logo.svg" alt="logo" title="logo" />
            <h1>Chaty</h1>
          </a>
        </nav>

        <header>
          <h1>
            <span className="heading"> Instant Chats, </span> <br />
            Endless Connections
          </h1>
          <p>
            Elevate your messaging experience with our feature-rich chat
            application, enabling real-time communication, multimedia sharing,
            and effortless collaboration in a user-friendly interface
          </p>
          <form onSubmit={handleSubmit} className="input_div">
            <span>
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input
              type="email"
              placeholder="Sign Up With Email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <button className="button">LogIn</button>
          </form>
        </header>

        <footer>
          <p>
            Checkout The{" "}
            <a
              href="https://github.com/ashrafchowdury/Readme-file-maker"
              target="_blank"
            >
              <img src="https://img.icons8.com/fluency/48/000000/github.png" />
              Repository
            </a>
          </p>
          <p>
            Follow On{" "}
            <a href="https://twitter.com/Ashraf_365" target="_blank">
              <img src="https://img.icons8.com/fluency/48/000000/twitter.png" />
              @Ashraf_365
            </a>
          </p>
        </footer>
      </>
    );
  }
};

export default Home;
