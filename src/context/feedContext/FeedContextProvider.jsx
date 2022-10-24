import React, { useState, useEffect } from "react";
import FeedContext from "./FeedContext";

const FeedContextProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);
  const [feedMetrics, setFeedMetrics] = useState({});
  const [commentMetrics, setCommentMetrics] = useState({});

  const state = {
    feed,
    setFeed,
    feedMetrics,
    setFeedMetrics,
    commentMetrics, 
    setCommentMetrics
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    //Get Post Metrics
    const getPostMetrics = async () => {
      const map = {};
      const commentResponse = await fetch(
        "http://localhost:5000/feed/comments/metrics",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        }
      );
      const commentData = await commentResponse.json();
      for (let commentMetric of commentData) {
        map[commentMetric.post_id] = [parseInt(commentMetric.commentcount), 0];
      }
      const likeResponse = await fetch(
        "http://localhost:5000/feed/posts/likes",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        }
      );
      const likeData = await likeResponse.json();
      for (let likeMetric of likeData) {
        if (likeMetric.post_id in map) {
          map[likeMetric.post_id][1] = parseInt(likeMetric.likecount);
        } else {
          map[likeMetric.post_id] = [0, parseInt(likeMetric.likecount)];
        }
      }
      setFeedMetrics(map);
    };
    getPostMetrics();

    //Get Comment Metrics

    const getCommentMetrics = async () => {
      const map = {};

      const response = await fetch(
        "http://localhost:5000/feed/comments/likes",
        {
          method: "GET",
          headers: { "Content-Type": "application/json", token: token },
        }
      );
      const commentLikesData = await response.json();
      for (let commentLike of commentLikesData) {
        map[commentLike.comment_id] = parseInt(commentLike.likecount);
      }
      setCommentMetrics(map);
    };
    getCommentMetrics();
  }, []);
  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
};

export default FeedContextProvider;
