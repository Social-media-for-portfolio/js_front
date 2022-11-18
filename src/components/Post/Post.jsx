import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext/AuthContext";
import FeedContext from "../../context/feedContext/FeedContext";
import {
  deletePost,
  getAllComments,
  likePost,
  unlikePost,
  userLikesPost,
} from "../../utils/api";
import Comment from "../Comment";
import CommentInput from "../CommentInput/CommentInput";
import PostTagsModal from "../PostTagsModal/PostTagsModal";
import Tag from "../Tag";
import "./post.css";

const Post = ({
  postId,
  src,
  avatar,
  username,
  dateTime,
  body,
  userId,
  tags,
}) => {
  const { userInfo } = useContext(AuthContext);
  const { feed, setFeed, feedMetrics, setFeedMetrics } =
    useContext(FeedContext);
  const { id } = userInfo;
  const likes = feedMetrics[postId] ? feedMetrics[postId][1] : 0;
  const comments = feedMetrics[postId] ? feedMetrics[postId][0] : 0;
  const [revealComments, setRevealComments] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [modalShow, setModalShow] = useState(false);

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
        map[postId] = [0, 1];
      }
    }
    setFeedMetrics(map);
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

  const allTags = tags.map((tag) => {
    return <Tag tagName={tag} />;
  });
  const tagComponents = allTags.slice(1, 5);
  const updateComments = async (id) => {
    const comments = await getAllComments(id);
    setPostComments(comments);
    return;
  };

  const checkLike = async () => {
    const boolean = await userLikesPost(postId);
    if (boolean) setIsLiked(true);
    else setIsLiked(false);
    return;
  };
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

  const handleModalShow = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    updateComments(postId);
    checkLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-5 w-50 post p-3">
      <div className="d-flex justify-content-between">
        <div>
          <Link to={`/userProfile/${userId}`}>
            <img src={avatar} className="post-avatar mx-3" alt="user-avatar" />
          </Link>
          <div className="d-flex flex-column mx-3">
            <h2>{username}</h2>
            <p>{DateTime.fromISO(dateTime).toRelative()}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between align-self-start">
          {tagComponents}
          {tagComponents.length < allTags.length - 1 && (
            <div
              onClick={handleModalShow}
              className="view-tags-btn rounded-pill"
            >
              <p className="my-2 mx-2 ">View all tags</p>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="px-3 pt-3">{body}</p>
        {src && <img src={src} className="w-100 h-100" alt="post-img" />}
      </div>
      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p>{likes}</p>
            {isLiked ? (
              <FcLike onClick={handleLike} className="mx-2 fs-4 post-option" />
            ) : (
              <FcLikePlaceholder
                onClick={handleLike}
                className="mx-2 fs-4 post-option"
              />
            )}
          </div>
          <div className="d-flex justify-content-between">
            <p>{comments + " "}Comments</p>
            <FaRegCommentDots
              onClick={toggleComments}
              className="mx-2 fs-4 post-option"
            />
            {userId === id && (
              <TiDeleteOutline
                onClick={handleDeletePost}
                className="mx-2 fs-3 post-option"
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
      <PostTagsModal
        tags={tags}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Post;
