import React, { useEffect, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import { Routes, Route } from "react-router-dom";

import AuthContext from "./context/authContext/AuthContext";
import Signup from "./pages/Signup";

const App = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/login" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/register" element={isAuth ? <Home /> : <Signup />}></Route>
      <Route path="/home" element={isAuth ? <Home /> : <Login />}></Route>
      <Route
        path="/userProfile/:id"
        element={isAuth ? <UserProfile /> : <Login />}
      ></Route>
    </Routes>
  );
};

export default App;
