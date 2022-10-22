import React, { useContext } from "react";
import { GrLike } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { DateTime } from "luxon";
import AuthContext from "../../context/authContext/AuthContext";
import "./comment.css";

const Comment = ({
  commentId,
  src,
  avatar,
  username,
  dateTime,
  body,
  userId,
  likes = 0,
}) => {
  const { userInfo } = useContext(AuthContext);

  return (
      <div className="my-2 comment p-3">
        <div className="d-flex align-items-center">
          <img src={avatar} className="comment-avatar" />
          <div className="d-flex flex-column mx-3">
            <h4>{username}</h4>
            <p>{DateTime.fromISO(dateTime).toRelative()}</p>
          </div>
        </div>
        <div>
          <p className="px-3 pt-3">{body}</p>
          {src && <img src={src} className="w-100 h-100" />}
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-end">
            <div className="d-flex">
              <p>{likes}</p>
              <GrLike className="mx-2 fs-4" />
            </div>
            <div className="d-flex justify-content-between">
              {userId === userInfo.id && (
                <TiDeleteOutline
                  //   onClick={handleDeletePost}
                  className="mx-2 fs-3"
                />
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Comment;
