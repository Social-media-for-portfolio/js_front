import React, { useState, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import AuthContext from "../../context/authContext/AuthContext";
import { useParams, useLocation } from "react-router-dom";
import ToggleFriends from "../../components/ToggleFriends";

const UserFriends = () => {
  const {userInfo} = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const { userFriends } = location.state;
  console.log(userFriends);
  const [toggleFriends, setToggleFriends] = useState("friends");
  return (
    <div>
      <Navbar />
      <div className = "content">
      {userInfo.id === Number(id) && (
      <><ToggleFriends setToggleFriends={setToggleFriends} />
      <div>
        {toggleFriends === "incoming" && <h2>Incoming</h2>}
        {toggleFriends === "outgoing" && <h2>Outgoing</h2>}
        {toggleFriends === "friends" && <h2>Friends</h2>}
      </div>
      </>)}
      {userInfo.id !== Number(id) && (
        <h3>Friends</h3>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default UserFriends;
