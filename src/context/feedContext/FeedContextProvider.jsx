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
    setCommentMetrics,
  };

  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
};

export default FeedContextProvider;
