import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext/AuthContext";
import "./comment-input.css";

const CommentInput = ({ userAvatar }) => {
  const { userInfo } = useContext(AuthContext);
  const [commentContent, setCommentContent] = useState();

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  return (
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img className="comment-input-avatar" src={userInfo.avatarUrl} />
      <form
        className="d-flex justify-content-between w-100"
        // onSubmit={}
      >
        <textarea
          className="w-100 mx-2 p-2 comment-input-area"
          value={commentContent}
          onChange={handleChange}
          type="text"
          placeholder="Write a comment..."
        />
        <button className="btn btn-success submit-btn h-25 align-self-end">
          Comment!
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
