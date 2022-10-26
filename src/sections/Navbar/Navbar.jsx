import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { isAuth, setIsAuth, userInfo } = useContext(AuthContext);
  const userId = userInfo.id;

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
          <h5 onClick={handleClick}>Logout</h5>
          <Link to={`/userProfile/${userId}`}>
            <img className="navbar-avatar mx-3" src={userInfo.avatarUrl} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
