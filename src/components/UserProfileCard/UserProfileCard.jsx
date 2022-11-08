import React, { useContext, useState, useEffect } from "react";
import UserProfileFriendsCard from "../UserProfileFriendsCard";
import AuthContext from "../../context/authContext/AuthContext";
import {
  removeFriend,
  updateUserInfo,
  sendFriendRequest,
} from "../../utils/api";
import "./user-profile-card.css";

const UserProfileCard = ({
  userFriends,
  setUserFriends,
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
  const { userInfo, friends, requests, setRequests, setFriends } =
    useContext(AuthContext);

  const isMyUser = Number(userId) === userInfo.id ? true : false;

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    location: "",
    birthday: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const unfriend = async () => {
    await removeFriend(userId);
    if (userId in friends) {
      const map = { ...friends };
      delete map[userId];
      setFriends(map);
    }
    if (userId in requests) {
      const map = { ...requests };
      delete map[userId];
      setRequests(map);
    }
  };
  const sendRequest = async () => {
    const map = { ...requests };
    map[userId] = true;
    setRequests(map);
    await sendFriendRequest(userId);
  };
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

  const getFriendAvatarsAndId = () => {
    let avatar1 = null;
    let avatar2 = null;
    let avatar3 = null;
    let id1 = null;
    let id2 = null;
    let id3 = null;
    let counter = 0;
    for (let friend in userFriends) {
      console.log(friend);
      if (counter === 0) {
        avatar1 = userFriends[friend][2];
        id1 = userFriends[friend][3];
      }
      if (counter === 1) {
        avatar2 = userFriends[friend][2];
        id2 = userFriends[friend][3];
      }
      if (counter === 2) {
        avatar3 = userFriends[friend][2];
        id3 = userFriends[friend][3];
        break;
      }
      counter++;
    }
    return { avatar1, avatar2, avatar3, id1, id2, id3 };
  };

  const { avatar1, avatar2, avatar3, id1, id2, id3 } = getFriendAvatarsAndId();

  return (
    <div className="d-flex flex-column profile-card w-75">
      <div className="d-flex justify-content-around align-items-center my-5 py-5 mx-3">
        <div className="d-flex align-items-center">
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
                {!isMyUser && !(userId in friends) && !(userId in requests) && (
                  <button
                    onClick={sendRequest}
                    className="btn btn-success h-25 align-self-center mx-4"
                  >
                    Add to friends!
                  </button>
                )}
                {!isMyUser && userId in friends && (
                  <button
                    onClick={unfriend}
                    className="btn btn-danger h-25 align-self-center mx-4"
                  >
                    Remove from friends!
                  </button>
                )}
                {!isMyUser && userId in requests && (
                  <button
                    onClick={unfriend}
                    className="btn btn-secondary h-25 align-self-center mx-4"
                  >
                    Request sent!
                  </button>
                )}
              </div>
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
        </div>
        <UserProfileFriendsCard
          userFriends={userFriends}
          setUserFriends={setUserFriends}
          userId={userId}
          friendMetric={Object.keys(userFriends)}
          id1={id1}
          id2={id2}
          id3={id3}
          avatar1={avatar1}
          avatar2={avatar2}
          avatar3={avatar3}
        />
      </div>
    </div>
  );
};

export default UserProfileCard;
