import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import AuthContext from "./context/authContext/AuthContext";
import Signup from "./pages/Signup";

const App = () => {
  const { isAuth, setIsAuth, userInfo, setUserInfo } = useContext(AuthContext);

  const isAuthenticated = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/auth/is-verified", {
        method: "GET",
        headers: { "Content-Type": "application/json", token: token },
      });
      const parseRes = await response.json();
      if (parseRes) {
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
      <Route path="/login" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/register" element={isAuth ? <Home /> : <Signup />}></Route>
      <Route path="/home" element={isAuth ? <Home /> : <Login />}></Route>
    </Routes>
  );
};

export default App;
