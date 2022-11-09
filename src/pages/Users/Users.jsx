import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer";
import UserCard from "../../components/UserCard";
import { getAllUsers, getMyUserInfo } from "../../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const { id } = await getMyUserInfo();
    const users = await getAllUsers();
    const filtered = users.filter((user) => user.id !== id);
    setUsers(filtered);
  };

  const userComponents = users.map((user) => {
    return (
      <UserCard
        key={user.id}
        firstName={user.first_name}
        lastName={user.last_name}
        avatar={user.avatar_url}
        friendId={user.id}
        authUserId={Infinity}
        userId={-Infinity}
        bio={user.bio}
      />
    );
  });
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container-fluid mx-0 px-0">
      <Navbar />
      <div className="content d-flex flex-column align-items-center">
        {userComponents}
      </div>
      <Footer />
    </div>
  );
};

export default Users;
