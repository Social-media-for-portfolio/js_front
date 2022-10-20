import React from "react";
import "./post-input.css";

const PostInput = ({ userAvatar }) => {
  return (
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img src={userAvatar} />
      <form
        className="d-flex justify-content-between w-100"
        // onSubmit={createNewPost}
      >
        <textarea
          className="w-100 mx-2 p-2 input-area"
          // value = {}
          //   onChange={handleChange}
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
