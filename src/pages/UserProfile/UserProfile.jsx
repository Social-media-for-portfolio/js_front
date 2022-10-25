import React from 'react'
import { useLocation } from 'react-router-dom'

const UserProfile = () => {
    const location = useLocation();
    const {userId} = location.state;
    console.log(userId)
  return (
    <div>userProfile</div>
  )
}

export default UserProfile