import React from "react";
import "./toggle.css";

const ToggleActivites = ({ toggle, setToggle }) => {
  const handleClick = (e) => {
    setToggle(e.target.id);
  };
  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-self-center">
        <h2>Activity</h2>
      </div>
      <div className="d-flex justify-content-around my-5">
        <div className="d-flex flex-column">
          <h5 className="toggle-option" id="posts" onClick={handleClick}>
            Posts
          </h5>
          {toggle === "posts" && <div className="toggle-line"></div>}
        </div>
        <div>
          <h5 className="toggle-option" id="comments" onClick={handleClick}>
            Comments
          </h5>
          {toggle === "comments" && <div className="toggle-line"></div>}
        </div>
      </div>
    </div>
  );
};

export default ToggleActivites;
