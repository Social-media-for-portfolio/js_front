import React, { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import ToggleFriends from "../../components/ToggleFriends";
import UserCard from "../../components/UserCard";
import AuthContext from "../../context/authContext/AuthContext";


const UserFriends = () => {
  const {userInfo} = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const { userFriends } = location.state;
  
  const createFriendsArr = (obj) => {
    const result = [];
    for(let key in obj) {
        result.push(obj[key])
    }
    return result;
  } 
  const friends = createFriendsArr(userFriends);

  const friendCardComponents = friends.map((friend) => {
    return <UserCard firstName = {friend[0]} lastName = {friend[1]} avatar = {friend[2]} id = {friend[3]}/>
  })
  const [toggleFriends, setToggleFriends] = useState("friends");
  return (
    <div>
      <Navbar />
      <div className = "content">
      {userInfo.id === Number(id) && (
      <><ToggleFriends setToggleFriends={setToggleFriends} />
      <div>
        {toggleFriends === "incoming" && <h2>Incoming</h2>}
        {toggleFriends === "outgoing" && <div>Outgoing</div>}
        {toggleFriends === "friends" && <h2>{friendCardComponents}</h2>}
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
