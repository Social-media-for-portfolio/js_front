import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes === true) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Login />}></Route>
    </Routes>
  );
};

export default App;
