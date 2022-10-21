import React, { useState } from "react";
import FeedContext from "./FeedContext";

const FeedContextProvider = ({ children }) => {
  const [feed, setFeed] = useState([]);

  const state = {
    feed,
    setFeed
  };

  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
};

export default FeedContextProvider;