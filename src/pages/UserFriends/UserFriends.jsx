import React, { useState, useContext, useEffect} from "react";
import { useParams} from "react-router-dom";
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
    const res = await getFriendsForUser(id);
    console.log(res)
    const obj = {...res};
    if(userInfo.id === Number(id) && userInfo.id in obj) delete obj[userInfo.id];
    if(id in obj) delete obj[id];
    setUserFriends(obj)
  };

  const [userFriends, setUserFriends] = useState({});
  console.log(userFriends);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);


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
    console.log(newFriend)
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

  const createFriendsArr = (obj) => {
    const result = [];
    for(let key in obj) {
        result.push(obj[key])
    }
    return result;
  } 
  const friends = createFriendsArr(userFriends);

  const friendCardComponents = friends.map((friend) => {
    return <UserCard firstName = {friend[0]} lastName = {friend[1]} avatar = {friend[2]} friendId = {friend[3]} authUserId = {userInfo.id} userId = {id} btnText = "Remove from Friends!" btnStyle = "btn-danger" func={unfriend}/>
  })
  const incomingRequestComponents = incomingRequests.map((friend) => {
    return <UserCard firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Accept" btnStyle = "btn-success" func = {acceptRequest} />
  })

  const outgoingRequestsComponents = outgoingRequests.map((friend) => {
    return <UserCard firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Cancel Request" btnStyle = "btn-danger" func ={cancelRequest}/>
  })
  const [toggleFriends, setToggleFriends] = useState("friends");

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
