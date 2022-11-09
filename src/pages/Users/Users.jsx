import React, {useState, useEffect}from 'react'
import Navbar from "../../sections/Navbar";
import Footer from "../../sections/Footer"
import UserCard from '../../components/UserCard';
import { getAllUsers } from '../../utils/api';

const Users = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const users = await getAllUsers();
        setUsers(users);
        console.log(users)
    }
    const userComponents = users.map((user) => {
        return <UserCard key = {user.id} firstName = {user.first_name} lastName = {user.last_name} avatar = {user.avatar_url} friendId = {user.id} authUserId = {Infinity} userId = {-Infinity} btnText = "Unfriend" btnStyle = "unfriend-btn"/>
      })
    useEffect(() => {
        getUsers();
    }, []);
  return (
    <div className = "container-fluid mx-0 px-0">
        <Navbar/>
        <div className = "content d-flex flex-column align-items-center">
        {userComponents}
        </div>
        <Footer/>
    </div>
  )
}

export default Users