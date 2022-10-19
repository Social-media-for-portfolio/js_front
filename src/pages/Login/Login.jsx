import React from "react";
import { useState, useContext } from "react";
import Navbar from "../../sections/Navbar";
import AuthContext from "../../authContext/AuthContext";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = inputs;
      if (![email, password].every(Boolean)) {
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
      } else alert(parseRes);
    } catch (error) {
      console.error(error);
    }
  };

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
