import React from "react";
import "./user-friends-card.css";

const UserProfileFriendsCard = ({ avatar1, avatar2, avatar3 }) => {
  return (
    <div className="d-flex justify-content-between">
      {avatar1 && <img className="friends-avatar" src={avatar1}></img>}
      {avatar2 && <img className="friends-avatar" src={avatar2}></img>}
      {avatar3 && <img className="friends-avatar" src={avatar3}></img>}
    </div>
  );
};

export default UserProfileFriendsCard;
