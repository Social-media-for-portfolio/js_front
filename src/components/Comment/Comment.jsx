import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";
import { DateTime } from "luxon";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import {
  deleteComment,
  userLikesComment,
  likeComment,
  unlikeComment,
} from "../../utils/api";
import "./comment.css";

const Comment = ({
  postComments,
  setPostComments,
  commentId,
  postId,
  src,
  avatar,
  username,
  dateTime,
  body,
  userId,
}) => {
  const { userInfo } = useContext(AuthContext);
  const { feedMetrics, setFeedMetrics, commentMetrics, setCommentMetrics } =
    useContext(FeedContext);

  const [isLiked, setIsLiked] = useState(false);

  const likes = commentMetrics[commentId] ? commentMetrics[commentId] : 0;

  const updateComments = () => {
    const newComments = postComments.filter(
      (comment) => comment.id !== commentId
    );
    return newComments;
  };
  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await deleteComment(postId, commentId);
    const newComments = updateComments();
    setPostComments(newComments);
    const map = { ...feedMetrics };
    map[postId][0] -= 1;

    setFeedMetrics(map);
  };

  const checkLike = async () => {
    const boolean = await userLikesComment(commentId);
    if (boolean) setIsLiked(true);
    else setIsLiked(false);
    return;
  };

  const handleLikeComment = async () => {
    const map = { ...commentMetrics };
    if (!isLiked) {
      await likeComment(commentId, postId);
      if (commentId in map) {
        map[commentId] += 1;
      } else {
        map[commentId] = 1;
      }
      setIsLiked(true);
      setCommentMetrics(map);
      return;
    }
    await unlikeComment(commentId);
    map[commentId] -= 1;
    setIsLiked(false);
    setCommentMetrics(map);
    return;
  };
  useEffect(() => {
    checkLike();
  });

  return (
    <div className="my-2 comment p-3">
      <div className="d-flex align-items-center">
        <Link to="userProfile" state={{ userId }}>
          <img src={avatar} className="comment-avatar" />
        </Link>
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
            {isLiked ? (
              <FcLike onClick={handleLikeComment} className="mx-2 fs-4" />
            ) : (
              <FcLikePlaceholder
                onClick={handleLikeComment}
                className="mx-2 fs-4"
              />
            )}
          </div>
          <div className="d-flex justify-content-between">
            {userId === userInfo.id && (
              <TiDeleteOutline
                onClick={handleDeleteComment}
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
