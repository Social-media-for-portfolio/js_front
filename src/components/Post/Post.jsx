import React from "react";
import "./post.css";
import { GrLike } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { DateTime } from "luxon";

const Post = ({
  src,
  avatar,
  username,
  dateTime,
  body,
  likes = 0,
  comments = 0,
}) => {
  return (
    <div className="my-5 w-25 post">
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
      <div className = "mt-5">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <p>{likes}</p>
          <GrLike className="mx-2 fs-4" />
        </div>
        <div className="d-flex justify-content-between ">
          <p>{comments + " "}Comments</p>
          <FaRegCommentDots className="mx-2 fs-4" />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
