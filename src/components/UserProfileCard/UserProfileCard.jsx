import React, { useContext, useState } from "react";
import { useEffect } from "react";
import AuthContext from "../../context/authContext/AuthContext";
import { updateUserInfo } from "../../utils/api";
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

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    location: "",
    birthday: "",
    bio: "",
  });
  console.log(info)
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "firstName":
        setInfo({ ...info, firstName: e.target.value });
        break;
      case "lastName":
        setInfo({
          ...info,
          lastName: e.target.value,
        });
        break;
      case "location":
        setInfo({ ...info, location: e.target.value });
        break;
      case "birthday":
        setInfo({ ...info, birthday: e.target.value });
        break;
      case "bio":
        setInfo({ ...info, bio: e.target.value });
        break;
    }
    console.log(info);
  };

  const handleInfoUpdate = async () => {
    await updateUserInfo(userId, info.firstName, info.lastName, info.location, info.birthday, info.bio);
  };
  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      handleInfoUpdate();
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {}, [isEditing]);

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
              onChange={handleChange}
              value={info.firstName}
              id="firstName"
              type="text"
              className="my-1"
              placeholder="First name"
            ></input>
            <input
              onChange={handleChange}
              value={info.lastName}
              id="lastName"
              type="text"
              className="my-1"
              placeholder="Last name"
            ></input>
            <input
              onChange={handleChange}
              value={info.location}
              id="location"
              type="text"
              className="my-1"
              placeholder="Location"
            ></input>
            <input
              onChange={handleChange}
              value={info.birthday}
              id="birthday"
              type="text"
              className="my-1"
              placeholder="Birthday"
            ></input>
            <input
              onChange={handleChange}
              value={info.bio}
              id="bio"
              type="text"
              className="my-1"
              placeholder="Bio"
            ></input>
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
