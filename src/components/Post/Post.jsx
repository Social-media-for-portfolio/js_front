import React from "react";

const Post = ({ src, avatar, username, dateTime, body }) => {
  return (
    <div>
      <div className="d-flex align-items-center">
        <img src={avatar} />
        <div className="d-flex flex-column mx-3">
          <h2>{username}</h2>
          <p>{dateTime}</p>
        </div>
      </div>
      <div>
        <p className="px-3">{body}</p>
        {src && <img src={src} className="w-100 h-100" />}
      </div>
      {/* <div className="d-flex justify-content-between">
        <div className="d-flex">
          {likes && <GrLike className="mx-2 fs-4" />}
          <p>{likes}</p>
        </div>
        <p>{comments} Comments</p>
      </div> */}
    </div>
  );
};

export default Post;
