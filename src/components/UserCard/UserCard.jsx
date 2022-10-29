import React from 'react'
import {Link} from "react-router-dom"
import "./user-card.css"

const UserCard = ({firstName, lastName, avatar, id}) => {
  return (
    <div className = "d-flex flex-column w-25 align-items-center card">
        <Link to = {`/userProfile/${id}`}><img className = "card-avatar" src = {avatar}></img></Link>
        <h4>{firstName + " " +lastName}</h4>

    </div>
  )
}

export default UserCard