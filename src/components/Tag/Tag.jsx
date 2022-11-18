import React from "react";
import "./tag.css";

const Tag = ({ tagName }) => {
  return (
    <div className=" d-flex flex-column justify-content-center tag-icon mx-1 rounded-pill">
      <p className="px-3 my-1">{tagName}</p>
    </div>
  );
};

export default Tag;
