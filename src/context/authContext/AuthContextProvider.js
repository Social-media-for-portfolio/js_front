import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
    id: "",
    bio: "",
    birthday: "",
    location: "",
  });

  const [friends, setFriends] = useState({});

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/auth/is-verified", {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        });
        const parseRes = await response.json();
        if (parseRes === true) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    isAuthenticated();
  }, []);

  const state = {
    isAuth,
    setIsAuth,
    userInfo,
    setUserInfo,
    friends,
    setFriends,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
