import React, { useState, useContext } from "react";
import { Link, Navigate} from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import logo from "../../assets/logo.jpg";
import AuthContext from "../../context/authContext/AuthContext";
import "./signup.css";

const Signup = () => {
  const { setIsAuth } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
        setInputs({...inputs,  password: e.target.value});
        break;
      case "firstName":
        setInputs({ ...inputs, firstName: e.target.value });
        break;
      case "lastName":
        setInputs({ ...inputs, lastName: e.target.value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, firstName, lastName } = inputs;
      if (![email, password, firstName, lastName].every(Boolean)) {
        setError("missing credentials");
        setHighlightError(true);
        return;
      }
      const body = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuth(true);
      } else {
        setError(parseRes);
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
            type="text"
            placeholder="Enter your first name"
            id="firstName"
          />
          <input
            className={`w-25 mt-2 ${highlightError ? "input-error" : ""}`}
            onChange={handleChange}
            type="text"
            placeholder="Enter your last name"
            id="lastName"
          />
          <input
            className={`w-25 mt-2 ${highlightError ? "input-error" : ""}`}
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
          <button className="btn button">Sign up</button>
          {error === "missing credentials" && (
            <p className="error my-2 text-danger">
              Please fill out all required fields
            </p>
          )}
          {error === "user already exists" && (
            <p className="error my-2 text-danger">This email is alredy taken</p>
          )}
          <p className="my-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
