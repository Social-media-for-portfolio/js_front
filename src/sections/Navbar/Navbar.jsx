import React, { useContext } from "react";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const history = createBrowserHistory();
  const { isAuth, setIsAuth, userInfo } = useContext(AuthContext);
  const userId = userInfo.id;

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    history.replace("/login");
  };
  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="d-flex justify-content-between navbar align-items-center">
      <div className="d-flex mx-2">
        {isAuth && (
          <Link to="/home" className="link text-dark">
            <h5 className="mx-3">Home</h5>
          </Link>
        )}
        <h5>About</h5>
      </div>
      {isAuth && (
        <div className="d-flex align-items-center">
          <h5 className = "navbar-option"onClick={handleClick}>Logout</h5>
          <Link to={`/userProfile/${userId}`}>
            <img className="navbar-avatar mx-3" src={userInfo.avatarUrl} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
