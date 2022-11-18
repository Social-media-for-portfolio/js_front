import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ToggleFriends from "../../components/ToggleFriends";
import ToggleMutual from "../../components/ToggleMutual";
import UserCard from "../../components/UserCard";
import AuthContext from "../../context/authContext/AuthContext";
import Footer from "../../sections/Footer";
import Navbar from "../../sections/Navbar";
import {
  acceptFriendRequest,
  getFriendsForUser,
  getIncomingRequests,
  getOutgoingRequests,
  removeFriend,
} from "../../utils/api";

const UserFriends = () => {
  const { userInfo, friends } = useContext(AuthContext);
  const { id } = useParams();

  const getFriends = async () => {
    const friends = await getFriendsForUser(id);
    setUserFriends(friends);
  };

  const [userFriends, setUserFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [toggleFriends, setToggleFriends] = useState("friends");
  const [toggleMutual, setToggleMutual] = useState("all-friends");

  const unfriend = async (id) => {
    await removeFriend(id);
    const newList = userFriends.filter((friend) => friend.id !== id);
    setUserFriends(newList);
  };
  const cancelRequest = async (id) => {
    await removeFriend(id);
    const newRequests = outgoingRequests.filter((friend) => friend.id !== id);
    setOutgoingRequests(newRequests);
  };

  const acceptRequest = async (userId) => {
    const { first_name, last_name, avatar_url, id } = await acceptFriendRequest(
      userId
    );
    const friend = { first_name, last_name, avatar_url, id };
    const newList = [...userFriends];
    newList.push(friend);
    setUserFriends(newList);
    const newRequests = incomingRequests.filter((friend) => friend.id !== id);
    setIncomingRequests(newRequests);
  };

  const fetchIncomingRequests = async () => {
    const requests = await getIncomingRequests();
    setIncomingRequests(requests);
  };

  const fetchOutgoingRequests = async () => {
    const requests = await getOutgoingRequests();
    setOutgoingRequests(requests);
  };

  const friendCardComponents = userFriends.map((friend) => {
    return (
      <UserCard
        key={friend.id}
        firstName={friend.first_name}
        lastName={friend.last_name}
        avatar={friend.avatar_url}
        friendId={friend.id}
        authUserId={userInfo.id}
        userId={id}
        btnText="Unfriend"
        btnStyle="unfriend-btn"
        func={unfriend}
      />
    );
  });
  const incomingRequestComponents = incomingRequests.map((friend) => {
    return (
      <UserCard
        key={friend.id}
        firstName={friend.first_name}
        lastName={friend.last_name}
        avatar={friend.avatar_url}
        friendId={friend.id}
        authUserId={userInfo.id}
        userId={id}
        btnText="Accept"
        btnStyle="addfriend-btn"
        func={acceptRequest}
      />
    );
  });

  const outgoingRequestsComponents = outgoingRequests.map((friend) => {
    return (
      <UserCard
        key={friend.id}
        firstName={friend.first_name}
        lastName={friend.last_name}
        avatar={friend.avatar_url}
        friendId={friend.id}
        authUserId={userInfo.id}
        userId={id}
        btnText="Cancel"
        btnStyle="unfriend-btn"
        func={cancelRequest}
      />
    );
  });

  const mutualFriends = friendCardComponents.filter(
    (component) => component.props.friendId in friends
  );
  useEffect(() => {
    fetchIncomingRequests();
    fetchOutgoingRequests();
    getFriends();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="content">
        {userInfo.id === Number(id) && (
          <>
            <ToggleFriends
              setToggleFriends={setToggleFriends}
              toggleFriends={toggleFriends}
            />
            <div>
              {toggleFriends === "incoming" && (
                <div>{incomingRequestComponents}</div>
              )}
              {toggleFriends === "outgoing" && (
                <div>{outgoingRequestsComponents}</div>
              )}
              {toggleFriends === "friends" && <div>{friendCardComponents}</div>}
            </div>
          </>
        )}
        {userInfo.id !== Number(id) && (
          <div>
            <ToggleMutual
              toggleMutual={toggleMutual}
              setToggleMutual={setToggleMutual}
            />
            {toggleMutual === "all-friends" && (
              <div>{friendCardComponents}</div>
            )}
            {toggleMutual === "mutual-friends" && <div>{mutualFriends}</div>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserFriends;
