import React from "react";
import { useState } from "react";
import Navbar from "../../sections/Navbar";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
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
    }
  };

  const handleSubmit = () => {};
  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column h-25 w-50 justify-content-between"
      >
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
    </>
  );
};

export default Login;
