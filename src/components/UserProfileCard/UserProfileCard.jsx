import React, { useContext, useState } from "react";
import {FaPencilAlt} from "react-icons/fa"
import UserProfileFriendsCard from "../UserProfileFriendsCard";
import AuthContext from "../../context/authContext/AuthContext";
import { removeFriend, updateUserInfo, sendFriendRequest, updateAvatar} from "../../utils/api";
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

  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    location: "",
    birthday: "",
    bio: "",
  });

  const [userAvatar, setUserAvatar] = useState("");
  const [revealAvatarInput, setRevealAvatarInput] = useState(false)
  
  const isMyUser = Number(userId) === userInfo.id ? true : false;

  const handleAvatarInput = (e) => {
    setUserAvatar(e.target.value);
  }
  const revealInput = () => {
    if(revealAvatarInput) setRevealAvatarInput(false);
    else setRevealAvatarInput(true);
  }
  const avatarSubmit = async(e) => {
    e.preventDefault();
    if(userAvatar.length < 1) return;
    await updateAvatar(userId, userAvatar);
    setProfile({...profile, avatar_url:userAvatar});
    setUserAvatar("");
  }
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
  
  const handleInfoUpdate = async () => {
    if([info.firstName, info.lastName, info.lastName, info.birthday, info.bio].every(element => element === "")) return;
    const firstName = info.firstName !== "" ? info.firstName : profile.first_name;
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

  const getFriendAvatarsAndId = () => {
    let avatar1 = null;
    let avatar2 = null;
    let avatar3 = null;
    let id1 = null;
    let id2 = null;
    let id3 = null;

    if(userFriends.length < 1) return { avatar1, avatar2, avatar3, id1, id2, id3 };
   
    for(let i = 0; i < userFriends.length; i++) {
      if(i === 3) break;
      if(i === 0) {
        avatar1 = userFriends[i].avatar_url
        id1 = userFriends[i].id
      }
      if(i === 1) {
        avatar2 = userFriends[i].avatar_url
        id2 = userFriends[i].id
      }
      if(i === 2) {
        avatar3 = userFriends[i].avatar_url
        id3 = userFriends[i].id
      }
    }
    return { avatar1, avatar2, avatar3, id1, id2, id3 };
  };

  const { avatar1, avatar2, avatar3, id1, id2, id3 } = getFriendAvatarsAndId();

  return (
    <div className="d-flex flex-column profile-card w-75">
      <div className="d-flex justify-content-around align-items-center my-5 py-5 mx-3">
        <div className="d-flex align-items-center">
          <div className = "d-flex flex-column align-items-center">
          <img src={avatar} className="profile-avatar mx-3" />
          {isMyUser && (
            <FaPencilAlt onClick = {revealInput}className = "mt-4 fs-4"/>
          )}
          {revealAvatarInput && (
            <form onSubmit = {avatarSubmit} className = "mt-3 d-flex flex-column align-items-center">
                <input type = "text" placeholder = "Avatar url" value = {userAvatar} onChange = {handleAvatarInput}></input>
                <button className = "btn view-btn w-50 mt-2">Submit</button>
            </form>
          )}
        </div>
          {!isEditing && (
            <div className="d-flex">
              <div className="d-flex flex-column justify-content-end align-items-center">
                <h2 className="mx-4">{`${firstName} ${lastName}`}</h2>
                <h5 className="my-2">{location}</h5>
                <h6 className="my-1">{birthday}</h6>
                <h6 className="my-1"> Bio:</h6>
                <p>{bio}</p>
                {isMyUser && (
                  <button className="my-2 btn edit-btn" onClick={handleEdit}>
                    Edit
                  </button>
                )}
                {!isMyUser && !(userId in friends) && !(userId in requests) && (
                  <button
                    onClick={sendRequest}
                    className="btn addfriend-btn h-25 align-self-center mx-4"
                  >
                    Add friend
                  </button>
                )}
                {!isMyUser && userId in friends && (
                  <button
                    onClick={unfriend}
                    className="btn unfriend-btn h-25 align-self-center mx-4"
                  >
                    Unfriend
                  </button>
                )}
                {!isMyUser && userId in requests && (
                  <button
                    onClick={unfriend}
                    className="btn request-sent-btn h-25 align-self-center mx-4"
                  >
                    Request sent
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
                <button className="my-2 btn edit-btn" onClick={handleEdit}>
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
