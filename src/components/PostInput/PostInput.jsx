import React, { useState } from "react";
import { createPost } from "../../utils/api";
import "./post-input.css";
const PostInput = ({ userAvatar }) => {
  const [postContent, setPostContent] = useState("");

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postContent);
  }
  return (
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img src={userAvatar} />
      <form
        className="d-flex justify-content-between w-100"
        onSubmit={handleSubmit}
      >
        <textarea
          className="w-100 mx-2 p-2 input-area"
          value={postContent}
          onChange={handleChange}
          type="text"
          placeholder="Write a post..."
        />
        <button className="btn btn-success submit-btn h-25 align-self-end">
          Post!
        </button>
      </form>
    </div>
  );
};

export default PostInput;
