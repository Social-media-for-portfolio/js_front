import React, { useState, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import Logo from "../../assets/logo.jpg"
import AuthContext from "../../context/authContext/AuthContext";

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
    <div className="container-fluid px-0 mx-0">
      <Navbar />
      <div>
        <div className="row">
          <div className="col-6">
            <img src = {Logo} alt = "logo"/>
          </div>
          <div className="col-6 d-flex flex-column align-items-end">
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column h-25 w-50 my-5 mx-5"
            >
              <input
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                id="email"
              />
              <input
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                id="password"
              />
              <button>Log in</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
