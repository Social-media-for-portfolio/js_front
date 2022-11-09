import React from 'react'
import {Link} from "react-router-dom"
import "./user-card.css"

const UserCard = ({firstName, lastName, avatar, friendId, userId, authUserId, func, btnText, btnStyle, bio}) => {
  const handleClick = () => {
    func(friendId)
  }
  return (
    <div className = "d-flex flex-column w-25 align-items-center card my-2 mx-2 my-2">
        <Link to = {`/userProfile/${friendId}`}><img className = "card-avatar" src = {avatar}></img></Link>
        <h4>{firstName + " " +lastName}</h4>
        {Number(userId) === authUserId && <button onClick = {handleClick} className = {`btn ${btnStyle} my-2`}>{btnText}</button>}
        {bio && (
          <p>{bio}</p>
        )}
    </div>
  )
}

export default UserCard