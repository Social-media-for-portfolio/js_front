import React, { useEffect, useContext } from "react";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding/Onboarding";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Users from "./pages/Users";
import { getMyUserInfo, updateUserInfo } from "./utils/api";
import UserFriends from "./pages/UserFriends/UserFriends";
import { Routes, Route } from "react-router-dom";

import AuthContext from "./context/authContext/AuthContext";
import Signup from "./pages/Signup";

const App = () => {
  const { isAuth, userInfo, setUserInfo} = useContext(AuthContext);

  const updateUserInfo = async() => {
    const { id, first_name, last_name, avatar_url} = await getMyUserInfo();;
    setUserInfo({
      ...userInfo,
      id: id,
      firstName: first_name,
      lastName: last_name,
      avatarUrl: avatar_url,
    });
  }

  useEffect(() => {
    updateUserInfo();
  },[])

  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/onboarding" element={isAuth ? <Onboarding /> : <Login />}></Route>
      <Route path="/login" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/register" element={isAuth ? <Home /> : <Signup />}></Route>
      <Route path="/home" element={isAuth ? <Home /> : <Login />}></Route>
      <Route path="/users" element={isAuth ? <Users /> : <Login />}></Route>
      <Route
        path="/userProfile/:id"
        element={isAuth ? <UserProfile /> : <Login />}
      ></Route>
      <Route path="/userProfile/:id/friends"
        element={isAuth ? <UserFriends /> : <Login />}
      ></Route>
    </Routes>
  );
};

export default App;
