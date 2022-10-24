import React, { useContext, useState, useEffect } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { DateTime } from "luxon";
import CommentInput from "../CommentInput/CommentInput";
import Comment from "../Comment";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import {
  deletePost,
  getAllComments,
  likePost,
  unlikePost,
  userLikesPost
} from "../../utils/api";
import "./post.css";

const Post = ({ postId, src, avatar, username, dateTime, body, userId }) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed, feedMetrics } = useContext(FeedContext);
  const { id } = userInfo;

  const likes = feedMetrics[postId] ? feedMetrics[postId][1] : 0;
  const comments = feedMetrics[postId] ? feedMetrics[postId][0] : 0;

  const [revealComments, setRevealComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const map = { ...feedMetrics };
    if (isLiked) {
      setIsLiked(false);
      unlikePost(postId);
      map[postId][1] -= 1;
    } else {
      setIsLiked(true);
      likePost(postId);
      if (postId in map) {
        map[postId][1] += 1;
      } else {
        console.log("works?")
        map[postId] = [0, 1];
      }
    }
  };

  const commentComponents = postComments.map((comment) => {
    return (
      <Comment
        postComments={postComments}
        setPostComments={setPostComments}
        postId={comment.post_id}
        key={comment.id}
        commentId={comment.id}
        avatar={comment.avatar_url}
        username={comment.first_name + " " + comment.last_name}
        dateTime={comment.created_at}
        body={comment.content}
        userId={comment.user_id}
      />
    );
  });

  const updateComments = async (id) => {
    const comments = await getAllComments(id);
    setPostComments(comments);
    return;
  };

  const checkLike = async() => {
    const boolean = await userLikesPost(postId)
    if(boolean) setIsLiked(true);
    else setIsLiked(false);
    return;
  }
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

  useEffect(() => {
    updateComments(postId);
    checkLike();
  }, []);
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
        <p className="px-3 pt-3">{body}</p>
        {src && <img src={src} className="w-100 h-100" />}
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p>{likes}</p>
            {isLiked ? (
              <FcLike onClick={handleLike} className="mx-2 fs-4" />
            ) : (
              <FcLikePlaceholder onClick={handleLike} className="mx-2 fs-4" />
            )}
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
          <CommentInput
            postId={postId}
            postComments={postComments}
            setPostComments={setPostComments}
          />
          <div className="line my-3"></div>
          <div className="d-flex flex-column align-items-end">
            {commentComponents}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
