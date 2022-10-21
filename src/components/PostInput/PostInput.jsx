import React, { useState, useContext } from "react";
import {DateTime} from "luxon"
import { createPost, getPost } from "../../utils/api";
import FeedContext from "../../context/feedContext/FeedContext";
import AuthContext from "../../context/authContext/AuthContext";
import "./post-input.css";
import Post from "../Post/Post";
const PostInput = ({ userAvatar }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [postContent, setPostContent] = useState("");

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(postContent);
    const { avatarUrl, firstName, lastName } = userInfo;
    const post = {
      avatar_url: avatarUrl,
      first_name: firstName,
      last_name: lastName,
      created_at: DateTime.now().toISO(),
      content: postContent,
    };
    console.log(post);
    setFeed([post, ...feed]);
  };
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
