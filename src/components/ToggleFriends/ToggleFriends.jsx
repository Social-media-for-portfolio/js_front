import React from "react";

const ToggleFriends = ({ setToggleFriends }) => {
  const handleToggle = (e) => {
    switch (e.target.id) {
      case "incoming":
        setToggleFriends("incoming");
        break;
      case "outgoing":
        setToggleFriends("outgoing");
        break;
      case "friends":
        setToggleFriends("friends");
        break;
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <h5 onClick = {handleToggle} id="incoming">Incoming Requests</h5>
      <h5 onClick = {handleToggle} id="outgoing">Outgoing Requests</h5>
      <h5 onClick = {handleToggle} id="friends">Friends</h5>
    </div>
  );
};

export default ToggleFriends;
