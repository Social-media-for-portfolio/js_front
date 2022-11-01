import React from "react";
import {Link} from "react-router-dom"
import "./user-friends-card.css";

const UserProfileFriendsCard = ({ avatar1, avatar2, avatar3, id1, id2, id3, friendMetric, userId, userFriends, setUserFriends}) => {
  const friends = friendMetric ? friendMetric.length - 3 : 0;


  return (
    <div className = "d-flex flex-column align-items-center card">
        <h4 className = "my-5">Friends</h4>
        <div className="d-flex justify-content-between align-items-center px-4">
            {avatar1 && <Link to = {`/userProfile/${id1}`}><img className="friends-avatar" src={avatar1}></img></Link>}
            {avatar2 && <Link to = {`/userProfile/${id2}`}><img className="friends-avatar" src={avatar2}></img></Link>}
            {avatar3 && <Link to = {`/userProfile/${id3}`}><img className="friends-avatar" src={avatar3}></img></Link>}
            {friends > 0 && (
                <h6 className = "mx-2">{`and ${friends} more`}</h6>
            )}
    </div>
        {<Link to = {`/userProfile/${userId}/friends`}><h5 className = "my-5">View all</h5></Link>}      
    </div>
  );
};

export default UserProfileFriendsCard;
