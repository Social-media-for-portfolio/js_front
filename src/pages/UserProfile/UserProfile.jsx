import React from 'react'
import Navbar from '../../sections/Navbar';
import Footer from '../../sections/Footer';
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation();
    const {userId} = location.state;
    console.log(userId)
  return (
    <div>
    <Navbar/>
    <div>userProfile</div>
    <Footer/>
    </div>
  )
}

export default UserProfile