import React from 'react'
import {Link} from "react-router-dom"
import "./user-card.css"

const UserCard = ({firstName, lastName, avatar, friendId, userId, authUserId, func, btnText, btnStyle}) => {
  
  const handleClick = () => {
    func(friendId)
    alert("works")
  }
  return (
    <div className = "d-flex flex-column w-25 align-items-center card">
        <Link to = {`/userProfile/${friendId}`}><img className = "card-avatar" src = {avatar}></img></Link>
        <h4>{firstName + " " +lastName}</h4>
        {Number(userId) === authUserId && <button onClick = {handleClick} className = {`btn ${btnStyle}`}>{btnText}</button>}

    </div>
  )
}

export default UserCard