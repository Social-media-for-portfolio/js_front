import React from "react";
import {Link} from "react-router-dom"
import "./user-friends-card.css";

const UserProfileFriendsCard = ({ avatar1, avatar2, avatar3, id1, id2, id3}) => {
  return (
    <div className="d-flex justify-content-between">
      {avatar1 && <Link to = {`/userProfile/${id1}`}><img className="friends-avatar" src={avatar1}></img></Link>}
      {avatar2 && <Link to = {`/userProfile/${id2}`}><img className="friends-avatar" src={avatar2}></img></Link>}
      {avatar3 && <Link to = {`/userProfile/${id3}`}><img className="friends-avatar" src={avatar3}></img></Link>}
    </div>
  );
};

export default UserProfileFriendsCard;
