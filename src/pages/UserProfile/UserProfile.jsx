import React, {useEffect, useState} from 'react'
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import {getUserInfo, getPostsByUser} from "../../utils/api"
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation();
    const {userId} = location.state;

    const [profile, setProfile] = useState({})
    const [userPosts, setUserPosts] = useState({});

    console.log(profile);
    console.log(userPosts);
    
    const getUserProfile = async() => {
        const profile = await getUserInfo(userId);
        setProfile(profile);
        
    }
    const getUserPosts = async() => {
      const posts = await getPostsByUser(userId);
      setUserPosts(posts);
      
    }

    useEffect(() => {
        getUserProfile();
        getUserPosts();
    }, [])
  return (
    <div>
    <Navbar/>
    <div>userProfile</div>
    <Footer/>
    </div>
  )
}

export default UserProfile