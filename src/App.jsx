import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Onboarding from "./pages/Onboarding/Onboarding";
import UserFriends from "./pages/UserFriends/UserFriends";
import UserProfile from "./pages/UserProfile/UserProfile";
import Users from "./pages/Users";
import Welcome from "./pages/Welcome";
import { getMyUserInfo } from "./utils/api";

import AuthContext from "./context/authContext/AuthContext";
import Signup from "./pages/Signup";

const App = () => {
  const { isAuth, userInfo, setUserInfo } = useContext(AuthContext);

  const updateUserInfo = async () => {
    const { id, first_name, last_name, avatar_url } = await getMyUserInfo();
    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });
  };

  useEffect(() => {
    updateUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Welcome />}></Route>
      <Route
        path="/onboarding"
        element={isAuth ? <Onboarding /> : <Login />}
      ></Route>
      <Route path="/login" element={isAuth ? <Home /> : <Login />}></Route>
      <Route
        path="/register"
        element={isAuth ? <Onboarding /> : <Signup />}
      ></Route>
      <Route path="/home" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/users" element={isAuth ? <Users /> : <Login />}></Route>
      <Route
        path="/userProfile/:id"
        element={isAuth ? <UserProfile /> : <Login />}
      ></Route>
      <Route
        path="/userProfile/:id/friends"
        element={isAuth ? <UserFriends /> : <Login />}
      ></Route>
    </Routes>
  );
};

export default App;
