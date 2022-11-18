import React, { useEffect, useState } from "react";
import { getMyInterests } from "../../utils/api";
import InterestContext from "./InterestContext";

const InterestContextProvider = ({ children }) => {
  const [myInterests, setMyInterests] = useState({});

  const getInterests = async () => {
    const interests = await getMyInterests();
    const map = {};
    for (let interest of interests) {
      map[interest.interest] = true;
    }
    setMyInterests(map);
  };

  useEffect(() => {
    getInterests();
  }, []);

  const state = {
    myInterests,
    setMyInterests,
  };

  return (
    <InterestContext.Provider value={state}>
      {children}
    </InterestContext.Provider>
  );
};

export default InterestContextProvider;
