import React, { useState, useContext, useEffect} from "react";
import { useParams} from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import ToggleFriends from "../../components/ToggleFriends";
import UserCard from "../../components/UserCard";
import { getIncomingRequests, removeFriend, getFriendsForUser} from "../../utils/api";
import AuthContext from "../../context/authContext/AuthContext";


const UserFriends = () => {
  const {userInfo} = useContext(AuthContext);
  const { id } = useParams();

  const getFriends = async () => {
    setUserFriends(await getFriendsForUser(id));
  };

  const [userFriends, setUserFriends] = useState({});
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);


  const unfriend = async(id) => {
    await removeFriend(id);
    const obj = {...userFriends};
    delete obj[id];
    setUserFriends(obj)

  }

  const fetchIncomingRequests = async() => {
    const requests = await getIncomingRequests();
    setIncomingRequests(requests);
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
    return <UserCard firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id} btnText = "Accept!" btnStyle = "btn-success"/>
  })
  const [toggleFriends, setToggleFriends] = useState("friends");

  useEffect(() => {
    fetchIncomingRequests();
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
        {toggleFriends === "outgoing" && <div>Outgoing</div>}
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
