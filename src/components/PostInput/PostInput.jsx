import React, { useState, useContext } from "react";
import { DateTime } from "luxon";
import { createPost } from "../../utils/api";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import "./post-input.css";

const PostInput = ({ userAvatar }) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [postContent, setPostContent] = useState("");

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const createNewPostData = (id, userId) => {
    const { avatarUrl, firstName, lastName } = userInfo;
    const post = {
      id: id,
      user_id: userId,
      avatar_url: avatarUrl,
      first_name: firstName,
      last_name: lastName,
      created_at: DateTime.now().toISO(),
      content: postContent,
    };
    return post;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await createPost(postContent);
    const post = createNewPostData(newPost[0].id, newPost[0].user_id);
    setFeed([post, ...feed]);
  };
  return (
    <div className="d-flex justify-content-between h-100 align-items-center">
      <img className="post-input-avatar" src={userInfo.avatarUrl} />
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
