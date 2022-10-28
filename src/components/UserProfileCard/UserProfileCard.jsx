import React, { useContext, useState, useEffect } from "react";
import UserProfileFriendsCard from "../UserProfileFriendsCard";
import AuthContext from "../../context/authContext/AuthContext";
import { updateUserInfo, getFriendsForUser } from "../../utils/api";
import "./user-profile-card.css";

const UserProfileCard = ({
  userFriends,
  profile,
  setProfile,
  userId,
  avatar,
  firstName,
  lastName,
  bio,
  birthday,
  location,
}) => {
  const { userInfo, friends } = useContext(AuthContext);

  const isMyUser = Number(userId) === userInfo.id ? true : false;

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    location: "",
    birthday: "",
    bio: "",
  });

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
  };

  console.log(userFriends);
  const handleInfoUpdate = async () => {
    const firstName =
      info.firstName !== "" ? info.firstName : profile.first_name;
    const lastName = info.lastName !== "" ? info.lastName : profile.last_name;
    const location = info.location !== "" ? info.location : profile.location;
    const birthday = info.birthday !== "" ? info.birthday : profile.birthday;
    const bio = info.bio !== "" ? info.bio : profile.bio;
    await updateUserInfo(userId, firstName, lastName, location, birthday, bio);
    setProfile({
      ...profile,
      first_name: firstName,
      last_name: lastName,
      location: location,
      birthday: birthday,
      bio: bio,
    });
    setInfo({
      firstName: "",
      lastName: "",
      location: "",
      birthday: "",
      bio: "",
    });
  };
  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      handleInfoUpdate();
    } else {
      setIsEditing(true);
    }
  };

  const getFriendAvatars = () => {
    let avatar1 = null;
    let avatar2 = null;
    let avatar3 = null;
    let counter = 0;
    for(let friend in userFriends) {
      console.log(friend)
      if(counter === 0) avatar1 = userFriends[friend][2];
      if(counter === 1) avatar2 = userFriends[friend][2];
      if(counter === 2) {
        avatar3 = userFriends[friend][2]
        break;
      }
      counter ++; 
    }
    return {avatar1, avatar2, avatar3};
  }

const {avatar1, avatar2, avatar3} = getFriendAvatars();
  

  return (
    <div className="d-flex flex-column profile-card">
      <div className="d-flex justify-content-start align-items-center my-5 py-5 mx-3">
        <img src={avatar} className="profile-avatar mx-3" />
        {!isEditing && (
          <div className="d-flex">
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
            {!isMyUser && !(userId in friends) && (
              <button className="btn btn-success h-25 align-self-center mx-4">
                Add to friends!
              </button>
            )}
            {!isMyUser && userId in friends && (
              <button className="btn btn-danger h-25 align-self-center mx-4">
                Remove from friends!
              </button>
            )}
          </div>
        )}
        {isEditing && (
          <div className="d-flex flex-column ">
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
          </div>
        )}
        <UserProfileFriendsCard
          avatar1={avatar1}
          avatar2={avatar2}
          avatar3={avatar3}
        />
      </div>
    </div>
  );
};

export default UserProfileCard;
