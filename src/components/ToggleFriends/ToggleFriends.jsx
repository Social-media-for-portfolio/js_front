import React from "react";

const ToggleFriends = ({ setToggleFriends, toggleFriends }) => {
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
    <div className="d-flex justify-content-around mx-2 my-2">
      <div className="d-flex flex-column">
      <h5 className = "toggle-option" onClick = {handleToggle} id="friends">Friends</h5>
      {toggleFriends === "friends" && <div className="toggle-line"></div>}
      </div>
      <div className="d-flex flex-column">
      <h5 className = "toggle-option" onClick = {handleToggle} id="incoming">Incoming Requests</h5>
      {toggleFriends === "incoming" && <div className="toggle-line"></div>}
      </div>
      <div className="d-flex flex-column">
      <h5 className = "toggle-option"onClick = {handleToggle} id="outgoing">Outgoing Requests</h5>
      {toggleFriends === "outgoing" && <div className="toggle-line"></div>}
      </div>
    </div>
  );
};

export default ToggleFriends;
