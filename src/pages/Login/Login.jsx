import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import logo from "../../assets/logo.jpg";
import AuthContext from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [highlightError, setHighlightError] = useState(false);

  const handleChange = (e) => {
    setHighlightError(false);
    switch (e.target.id) {
      case "email":
        setInputs({ ...inputs, email: e.target.value });
        break;
      case "password":
        setInputs({
          ...inputs,
          password: e.target.value,
        });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = inputs;
      if (!email || !password) {
        setError("missing credentials");
        setHighlightError(true);
        return;
      }

      const body = { email: email, password: password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
      } else {
        setError("invalid credentials");
        setHighlightError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid mx-0 px-0">
      <Navbar />
      <div className="login d-flex flex-column align-items-center justify-content-center">
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column w-50 px-4 py-4 align-items-center justify-content-center form-wrapper"
        >
          <img className="logo mb-3" src={logo} />
          <input
            className={`w-25 ${highlightError ? "input-error" : ""}`}
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            id="email"
          />

          <input
            className={`w-25 my-2 ${highlightError ? "input-error" : ""}`}
            onChange={handleChange}
            type="password"
            placeholder="Enter your password"
            id="password"
          />
          <button className="btn button">Login</button>
          {error === "missing credentials" && (
            <p className="error my-2 text-danger">
              Please enter your email and password
            </p>
          )}
          {error === "invalid credentials" && (
            <p className="error my-2 text-danger">
              Password or email is incorrect
            </p>
          )}
          <p className="my-2">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
