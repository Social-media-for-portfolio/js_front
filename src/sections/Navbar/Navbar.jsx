import React, { useContext } from "react";
import AuthContext from "../../context/authContext/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { isAuth, setIsAuth, userInfo } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="d-flex justify-content-between navbar align-items-center">
      <div className="d-flex justify-content-between mx-2">
        <h5>About Us</h5>
      </div>
      {isAuth && (
        <div className="d-flex align-items-center">
          <h5 onClick={logout}>Logout</h5>
          <img className="navbar-avatar mx-3" src={userInfo.avatarUrl} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
