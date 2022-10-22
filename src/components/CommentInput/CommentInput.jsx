import React, { useState, useContext } from "react";
import { DateTime } from "luxon";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import { postComment } from "../../utils/api";
import "./comment-input.css";

const CommentInput = ({ postId, postComments, setPostComments }) => {
  const { userInfo } = useContext(AuthContext);
  const { feedMetrics, setFeedMetrics } = useContext(FeedContext);
  const [commentContent, setCommentContent] = useState("");

  const handleChange = (e) => {
    setCommentContent(e.target.value);
  };

  const createNewCommentData = (commentId) => {
    const { avatarUrl, firstName, lastName, id } = userInfo;
    const comment = {
      id: commentId,
      user_id: id,
      post_id: postId,
      content: commentContent,
      avatar_url: avatarUrl,
      first_name: firstName,
      last_name: lastName,
      created_at: DateTime.now().toISO(),
    };
    return comment;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await postComment(commentContent, postId);
    const comment = createNewCommentData(newComment[0].id);
    setPostComments([comment, ...postComments]);

    const map = { ...feedMetrics };
    if (postId in map) {
      map[postId][0] += 1;
    } else {
      map[postId] = [1, 0];
    }

    setFeedMetrics(map);
    setCommentContent("");
  };

  return (
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img className="comment-input-avatar" src={userInfo.avatarUrl} />
      <form
        className="d-flex justify-content-between w-100"
        onSubmit={handleSubmit}
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
