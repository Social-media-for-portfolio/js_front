import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    avatarUrl: "",
    id: ""
  })

  const state = {
    isAuth,
    setIsAuth,
    userInfo, 
    setUserInfo
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
