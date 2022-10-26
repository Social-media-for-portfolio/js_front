import React from 'react'
import "./user-profile-card.css"

const UserProfileCard = ({avatar,firstName,lastName }) => {
    
  return (
    <div className = "d-flex justify-content-start profile-card align-items-center my-5 py-5 mx-3">
        <img src = {avatar} className = "profile-avatar mx-3"/>
        <h4 className = "mx-4">{`${firstName} ${lastName}`}</h4>
    </div>
  )
}

export default UserProfileCard;