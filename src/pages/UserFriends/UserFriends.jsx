import React, { useState } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import { useParams, useLocation } from "react-router-dom";
import ToggleFriends from "../../components/ToggleFriends";

const UserFriends = () => {
  const { id } = useParams();
  const location = useLocation();
  const { userFriends } = location.state;
  const [toggleFriends, setToggleFriends] = useState("friends");
  return (
    <div>
      <Navbar />
      <ToggleFriends setToggleFriends={setToggleFriends} />
      <div>
        {toggleFriends === "incoming" && <h2>Incoming</h2>}
        {toggleFriends === "outgoing" && <h2>Outgoing</h2>}
        {toggleFriends === "friends" && <h2>Friends</h2>}
      </div>
      <Footer />
    </div>
  );
};

export default UserFriends;
