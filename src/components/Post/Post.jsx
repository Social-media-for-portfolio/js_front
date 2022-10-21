import React, { useContext, useState } from "react";
import { GrLike } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { DateTime } from "luxon";
import CommentInput from "../CommentInput/CommentInput";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import { deletePost } from "../../utils/api";
import "./post.css";

const Post = ({
  postId,
  src,
  avatar,
  username,
  dateTime,
  body,
  userId,
  likes = 0,
  comments = 0,
}) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed } = useContext(FeedContext);
  const { id } = userInfo;

  const [revealComments, setRevealComments] = useState(false);
  const [postComments, setPostComments] = useState([]);

  const toggleComments = () => {
    if (revealComments) {
      setRevealComments(false);
    } else setRevealComments(true);
  };

  const updateFeed = () => {
    const newFeed = feed.filter((post) => post.id !== postId);
    return newFeed;
  };
  const handleDeletePost = async (e) => {
    e.preventDefault();
    await deletePost(postId);
    const newFeed = updateFeed();
    setFeed(newFeed);
  };
  return (
    <div className="my-5 w-50 post p-3">
      <div className="d-flex align-items-center">
        <img src={avatar} className="post-avatar" />
        <div className="d-flex flex-column mx-3">
          <h2>{username}</h2>
          <p>{DateTime.fromISO(dateTime).toRelative()}</p>
        </div>
      </div>
      <div>
        <p className="px-3">{body}</p>
        {src && <img src={src} className="w-100 h-100" />}
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p>{likes}</p>
            <GrLike className="mx-2 fs-4" />
          </div>
          <div className="d-flex justify-content-between">
            <p>{comments + " "}Comments</p>
            <FaRegCommentDots onClick={toggleComments} className="mx-2 fs-4" />
            {userId === id && (
              <TiDeleteOutline
                onClick={handleDeletePost}
                className="mx-2 fs-3"
              />
            )}
          </div>
        </div>
      </div>

      {revealComments && (
        <div className="mt-4">
          <div className="line mb-4"></div>
          <CommentInput />
          <div className="d-flex flex-column align-items-end"></div>
        </div>
      )}
    </div>
  );
};

export default Post;
