import React, { useState, useContext, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import ToggleFriends from "../../components/ToggleFriends";
import UserCard from "../../components/UserCard";
import { getIncomingRequests, removeFriend, getFriendsForUser, getOutgoingRequests, acceptFriendRequest} from "../../utils/api";
import AuthContext from "../../context/authContext/AuthContext";


const UserFriends = () => {
  const {userInfo} = useContext(AuthContext);
  const { id } = useParams();

  const getFriends = async () => {
    const friends = await getFriendsForUser(id);
    setUserFriends(friends)   
  };

  const [userFriends, setUserFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [toggleFriends, setToggleFriends] = useState("friends");


  const unfriend = async(id) => {
    await removeFriend(id);
    const obj = {...userFriends};
    delete obj[id];
    setUserFriends(obj)
  }
  const cancelRequest = async(id) => {
    await removeFriend(id);
    const newRequests = outgoingRequests.filter(friend => friend.id !== id);
    setOutgoingRequests(newRequests);
  }

  const acceptRequest = async(id) => {
    const newFriend = await acceptFriendRequest(id);
    const arr = [newFriend.first_name, newFriend.last_name, newFriend.avatar_url, newFriend.id]
    const newFriends = {...userFriends, id: arr};
    setUserFriends(newFriends);
    const newRequests = incomingRequests.filter(friend => friend.id !== id);
    setIncomingRequests(newRequests);
  }

  const fetchIncomingRequests = async() => {
    const requests = await getIncomingRequests();
    setIncomingRequests(requests);
  }

  const fetchOutgoingRequests = async() => {
    const requests = await getOutgoingRequests();
    setOutgoingRequests(requests);
  }

  const friendCardComponents = userFriends.map((friend) => {
    return <UserCard key = {friend.id} firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Remove from Friends!" btnStyle = "btn-danger" func={unfriend}/>
  })
  const incomingRequestComponents = incomingRequests.map((friend) => {
    return <UserCard key = {friend.id} firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Accept" btnStyle = "btn-success" func = {acceptRequest} />
  })

  const outgoingRequestsComponents = outgoingRequests.map((friend) => {
    return <UserCard key = {friend.id} firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Cancel Request" btnStyle = "btn-danger" func ={cancelRequest}/>
  })

  useEffect(() => {
    fetchIncomingRequests();
    fetchOutgoingRequests();
    getFriends();
  },[])
  return (
    <div>
      <Navbar />
      <div className = "content">
      {userInfo.id === Number(id) && (
      <><ToggleFriends setToggleFriends={setToggleFriends} />
      <div>
        {toggleFriends === "incoming" && <div>{incomingRequestComponents}</div>}
        {toggleFriends === "outgoing" && <div>{outgoingRequestsComponents}</div>}
        {toggleFriends === "friends" && <div>{friendCardComponents}</div>}
      </div>
      </>)}
      {userInfo.id !== Number(id) && (
        <div>
        {friendCardComponents}
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default UserFriends;
