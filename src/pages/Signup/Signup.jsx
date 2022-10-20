import React from "react";
import { useState, useContext } from "react";
import Navbar from "../../sections/Navbar";
import AuthContext from "../../authContext/AuthContext";

const Signup = () => {
  const { setIsAuth } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column h-25 w-50 justify-content-between"
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter your first name"
          id="firstName"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter your last name"
          id="lastName"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter your email"
          id="email"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter your password"
          id="password"
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Signup;
