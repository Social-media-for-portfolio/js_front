import React, { useState, useContext, useEffect} from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import ToggleFriends from "../../components/ToggleFriends";
import UserCard from "../../components/UserCard";
import { getIncomingRequests } from "../../utils/api";
import AuthContext from "../../context/authContext/AuthContext";


const UserFriends = () => {
  const {userInfo} = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const { userFriends } = location.state;
  
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

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
    return <UserCard firstName = {friend[0]} lastName = {friend[1]} avatar = {friend[2]} friendId = {friend[3]} authUserId = {userInfo.id} userId = {id}/>
  })
  const incomingRequestComponents = incomingRequests.map((friend) => {
    return <UserCard firstName = {friend.first_name} lastName = {friend.last_name} avatar = {friend.avatar_url} friendId = {friend.id} authUserId = {userInfo.id} userId = {id}/>
  })
  const [toggleFriends, setToggleFriends] = useState("friends");

  useEffect(() => {
    fetchIncomingRequests();
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
