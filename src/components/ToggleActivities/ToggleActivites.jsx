import React, { useState } from "react";
import "./toggle.css";

const ToggleActivites = () => {
  const [toggle, setToggle] = useState("posts");

  const handleClick = (e) => {
    setToggle(e.target.id);
  };
  console.log(toggle);
  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-self-center">
        <h2>Activity</h2>
      </div>
      <div className="d-flex justify-content-around my-5">
        <div className="d-flex flex-column">
          <h5 id="posts" onClick={handleClick}>
            Posts
          </h5>
          {toggle === "posts" && <div className="line"></div>}
        </div>
        <div>
          <h5 id="comments" onClick={handleClick}>
            Comments
          </h5>
          {toggle === "comments" && <div className="line"></div>}
        </div>
      </div>
    </div>
  );
};

export default ToggleActivites;
