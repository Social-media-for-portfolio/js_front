import React, {useEffect, useState} from 'react'
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import {getUserInfo} from "../../utils/api"
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation();
    const {userId} = location.state;

    const [profile, setProfile] = useState({})
    
    const getUserProfile = async() => {
        const profile = await getUserInfo(userId);
        setProfile(profile);
        
    }

    useEffect(() => {
        getUserProfile();
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