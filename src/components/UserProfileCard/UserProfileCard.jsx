import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext/AuthContext";
import "./user-profile-card.css";

const UserProfileCard = ({
  userId,
  avatar,
  firstName,
  lastName,
  bio,
  birthday,
  location,
}) => {
  const { userInfo } = useContext(AuthContext);
  const isMyUser = Number(userId) === userInfo.id ? true : false;
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    if (isEditing) setIsEditing(false);
    else {
      setIsEditing(true);
    }
  };
  return (
    <div className="d-flex flex-column profile-card">
      <div className="d-flex justify-content-start align-items-center my-5 py-5 mx-3">
        <img src={avatar} className="profile-avatar mx-3" />
        {!isEditing && (
          <div className="d-flex flex-column justify-content-end align-items-center">
            <h2 className="mx-4">{`${firstName} ${lastName}`}</h2>
            <h5 className="my-2">{location}</h5>
            <h6 className="my-1">{birthday}</h6>
            <h6 className="my-1"> Bio:</h6>
            <p>{bio}</p>
            {isMyUser && (
              <button className="my-2 btn btn-success" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        )}
        {isEditing && (
          <form className="d-flex flex-column ">
            <input
              type="text"
              className="my-1"
              placeholder="First name"
            ></input>
            <input type="text" className="my-1" placeholder="Last name"></input>
            <input type="text" className="my-1" placeholder="Location"></input>
            <input type="text" className="my-1" placeholder="Birthday"></input>
            <input type="text" className="my-1" placeholder="Bio"></input>
            {isMyUser && (
              <button className="my-2 btn btn-success" onClick={handleEdit}>
                Done editing
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
